<template>
  <div class="corrects-edit">
    <div class="corrects-edit__top">
      <div class="contract-settles-executor__top">
        <a
          @click.prevent="$router.go(-1)"
          href="#"
          class="contract-settles-executor__back"
        >
          Вернуться назад
        </a>
      </div>
    </div>

    <div class="contract-corrects">
      <div class="contract-corrects__table">
        <Table
            v-if="adjustments"
            :data="adjustments.data"
            :total="adjustments.total"
            :columns="columns"
            @edit-item="editItem"
            @show-history="showHistory"
            @change-table-state="changeTableState"
            showStatusLabel
            extendedRow
            :title="false"
        >
        </Table>
      </div>

    </div>
  </div>
</template>

<script>
import Table from "@/components/common/Table";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PageContractWorkCorrectsHistory",
  components: {
    Table,
  },
  data: () => ({
    isFilterActive: false,
    page: 1,
    limit: 25,
    contractId: null,
    form: {
      number: "",
      helicopters: null,
      workType: null,
      work: null,
      unit: null,
      quantity: null,
      recipient: null,
      standards: null,
      components: ["Компонент 1"], // api?
      adjustment: {
        date:null,
        reason:null,
        document: null,
      }
    },
    columns: [
      "number",
      "helicopters",
      "work",
      "workType",
      "quantity",
      "unit",
      "recipient",
      "standarts",
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
    this.id = this.$route.params["id"];
    this.options = this.$route.params.options;
    this.contractId = this.$route.params.contractId
    console.log(this.$route.params.contractId)

    for (let key in this.$route.params.editForm) {
      // if (this.prepareFields.includes(key)) {

      this.$set(this.form, key, this.$route.params.editForm[key]);
      // }
    }
    this.currentWorkNumber = this.$route.params.editForm["number"];
    this.id = this.$route.params.editForm["id"];

    if (!this.adjustments) {
      this.getAdjustments({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    }
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
      changeAdjustmentForm: "changeAdjustmentForm",
      getSupplyRecipient: "getSupplyRecipient", // Автозаполнение поля “Получатель”
      getSupplyAdjustments: "getSupplyAdjustments", // Автозаполнение поля “Получатель”
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
    async editItem(formData) {
      console.log('ttt')
      await this.autoCompleteFields(formData.id);

      const editForm = {};
      console.log(formData)
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
