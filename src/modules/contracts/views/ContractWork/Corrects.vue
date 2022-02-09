<template>
  <div class="contract-corrects">
    <div class="contract-corrects__table">
      <Table
        v-if="adjustments"
        :data="adjustments.data"
        :total="adjustments.total"
        :columns="columns"
        @edit-item="editItem"
        @show-history="showHistory"
        :menu-items="menuItems"
        @change-table-state="changeTableState"
        tableTitle="Таблица корректировки перечня"
        commonDots
        commonCheckbox
        rowCheckbox
        rowDots
        showStatusLabel
      >
        <template #titlePanel>
          <IconSwitch
            name="search"
            color="#90A0B7"
            :isButton="true"
            class="icon"
          />
          <IconSwitch name="excel" color="#90A0B7" :isButton="true" />
          <div @click="isFilterActive = true">
            <IconSwitch name="filter" color="#90A0B7" :isButton="true" />
          </div>
        </template>
      </Table>
    </div>
    <ModalFilter
        v-if="isFilterActive"
        :data="filterData"
        :filters="getFilters"
        @close-filter-modal="isFilterActive = false"
        @filter-save="filterCorrects($event)"
        @filter="filterUpdate"
    />
  </div>
</template>

<script>
import Table from "@/components/common/Table";
import IconSwitch from "@/components/simple/IconSwitch";
import ModalFilter from "../../modals/ModalFilter";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PageContractWorkCorrects",
  components: {
    Table,
    IconSwitch,
    ModalFilter,
  },
  data: () => ({
    isFilterActive: false,
    page: 1,
    limit: 25,
    columns: [
      "position",
      "helicopters",
      "work",
      "workType",
      "quantity",
      "unit",
      "recipient",
      "standards",
    ],
    menuItems: [
      { name: "Редактировать", action: "edit-item" },
      { name: "История корректировок", action: "show-history" },
    ],
    workTypes: null,
    units: null,
    helicopters: null,
    recipients: null,
    works: null,
    standards: null,
  }),
  mounted() {
    this.getSupplyAdjustments({
      contractId: this.contractId,
      supplyId: 1,
      page: this.page,
      limit: this.limit,
    });
    // if (!this.adjustments) {
      this.getAdjustments({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    // }
  },
  computed: {
    ...mapGetters("contracts", {
      adjustments: "adjustments",
      contracts: "contracts",
      helicoptersFilter: "helicopters",
      workTypesFilter: "workTypes",
      recipientsFilter: "recipients",
    }),
    contractId() {
      return Number(this.$route.params.id);
    },
    filterData() {
      return {
        helicopters: this.helicoptersFilter,
        workTypes: this.workTypesFilter,
        recipients: this.recipientsFilter,
      }
    },
    getModuleName() {
      return this.$route.meta.MODULE;
    },
    getSubModule() {
      return this.$route.meta.SUBMODULE;
    },
    getFilters() {
      return this.$config[this.getModuleName][this.getSubModule].filters;
    },
  },
  methods: {
    ...mapActions("contracts", {
      getAdjustments: "getAdjustments",
      getSupplyAdjustments: "getSupplyAdjustments",
      changeAdjustmentForm: "changeAdjustmentForm",
      getSupplyRecipient: "getSupplyRecipient", // Автозаполнение поля “Получатель”
      getSupplyWork: "getSupplyWork", // “Наименование работы”
      getSupplyStandart: "getSupplyStandart", //“НТД”
      getSupplyForm: "getSupplyForm",
    }),
    changeTableState({ page, limit }) {
      this.page = page;
      this.limit = limit;

      this.getAdjustments({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    },
    async autoCompleteFields(formDataId) {
      const [
        {
          data: { workTypes, units, helicopters },
        },
        {
          data: { data: recipients },
        },
        {
          data: { data: works },
        },
        {
          data: { data: standart },
        },
      ] = await Promise.all([
        this.changeAdjustmentForm({
          contractId: +this.contractId,
          supplyId: formDataId,
        }),
        this.getSupplyRecipient({ id: +this.contractId }),
        this.getSupplyWork({ id: +this.contractId }),
        this.getSupplyStandart({ id: +this.contractId }),
      ]);

      this.recipients = recipients;
      this.works = works;
      this.standards = standart;
      this.workTypes = workTypes;
      this.units = units;
      this.helicopters = helicopters;
      Promise.resolve(true);
    },
    deleteBraces(string) {
      var regExpDelBrackets = /[()]/g;
      return string.replace(regExpDelBrackets, "");
    },
    async editItem(formData) {
      console.log(formData, 'form')
      await this.autoCompleteFields(formData.id);

      const editForm = {};
      for (let key in formData) {
        if (key === "helicopters" && formData[key].length) {
          editForm[key] = [
            this.helicopters.find((item) => {
              return (
                item.name === formData[key][0].name ||
                item.name.substr(2) === formData[key][0].name
              );
            }),
          ];
          continue;
        }
        if (key === "workType" && formData[key].name) {
          editForm[key] = this.workTypes.find(
            (item) => item.name.substr(2) === formData[key].name
          );
          continue;
        }
        if (key === "work" && formData[key].name) {
          editForm[key] = this.works.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        if (key === "unit" && formData[key].name) {
          editForm[key] = this.units.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        if (key === "recipient" && formData[key].name) {
          editForm[key] = this.recipients.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        if (key === "standards" && formData["standards"]?.[0]?.symbol) {
          editForm[key] = this.standards.find((item) => {
            return this.deleteBraces(item.name).includes(
              formData["standards"][0].symbol
            );
          });
          continue;
        }

        editForm[key] = formData[key];
      }

      this.$router.push({
        name: 'PageContractWorkCorrectsEdit',
        params: {
          editForm: editForm,
          options: {
            workTypes: this.workTypes,
            units: this.units,
            helicopters: this.helicopters,
            recipients: this.recipients,
            works: this.works,
            standards: this.standards,
            contracts: this.contracts,
          },
        },
      });
    },
    async showHistory(formData) {
      await this.autoCompleteFields(formData.id);

      const editForm = {};
      console.log('formData')
      for (let key in formData) {
        if (key === "helicopters" && formData[key].length) {
          console.log("here");
          editForm[key] = [
            this.helicopters.find((item) => {
              return (
                item.name === formData[key][0].name ||
                item.name.substr(2) === formData[key][0].name
              );
            }),
          ];
          continue;
        }
        if (key === "workType" && formData[key].name) {
          editForm[key] = this.workTypes.find(
            (item) => item.name.substr(2) === formData[key].name
          );
          continue;
        }
        if (key === "work" && formData[key].name) {
          editForm[key] = this.works.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        if (key === "unit" && formData[key].name) {
          editForm[key] = this.units.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        if (key === "recipient" && formData[key].name) {
          editForm[key] = this.recipients.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        if (key === "standards" && formData["standards"]?.[0]?.symbol) {
          editForm[key] = this.standards.find((item) => {
            return this.deleteBraces(item.name).includes(
              formData["standards"][0].symbol
            );
          });
          continue;
        }

        if (key === "components" && formData[key]?.[0]?.name) {
          editForm[key] = [formData[key][0].name];
          continue;
        }

        editForm[key] = formData[key];
      }

      this.$router.push({
        name: 'PageContractWorkCorrectsHistory',
        params: {
          editForm: editForm,
          contractId: this.contractId,
          options: {
            workTypes: this.workTypes,
            units: this.units,
            helicopters: this.helicopters,
            recipients: this.recipients,
            works: this.works,
            standards: this.standards,
            contracts: this.contracts,
          },
        },
      });
    },
    filterCorrects(filter) {
      this.getAdjustments({
        id: this.contractId,
        page: this.page,
        limit: this.limit,

        filter: filter,
      });
    },
    filterUpdate(val) {
      this.$store.dispatch(`catalog/recipient`, {
        page: this.page,
        limit: this.limit,
        q: val
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.contract-corrects {
  display: flex;
  flex-direction: column;
}
.contract-settles-executor {
  display: flex;
  flex-direction: column;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
}
</style>
