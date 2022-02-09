<template>
  <div class="contract-agree">
    <div class="contract-agree__table">
      <Table
        v-if="agreement"
        :data="agreement.data"
        :total="agreement.total"
        :columns="columns"
        :menu-items="menuItems"
        @edit-item="editItem"
        @select-rows="checkBoxedRows = $event"
        @approve="approve"
        @revision="revision"
        @change-table-state="changeTableState"
        tableTitle="Таблица согласование перечня"
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
          <IconSwitch name="download" color="#90A0B7" :isButton="true" />
          <BaseButton :text="'Согласовать'" @click="isAgreeModalActive = true" />
        </template>
      </Table>
    </div>
    <modal-agreement
      v-if="isEditModalActive"
      @close="closeModal"
      @close-and-update="updateAndCloseModal"
      :options="{
        workTypes,
        units,
        helicopterTypes,
        recipients,
        works,
        standards,
      }"
      :editForm="editForm"
    />
    <ModalFilter
        v-if="isFilterActive"
        :data="filterData"
        :filters="getFilters"
        @close-filter-modal="isFilterActive = false"
        @filter-save="filterAgrees($event)"
        @filter="filterUpdate"
    />
    <send-agree v-if="isAgreeModalActive"
                @close-agree-modal="isAgreeModalActive = false"
                @send-approve="approve(checkBoxedRows)"
    />
  </div>

</template>

<script>
import Table from "@/components/common/Table";
import IconSwitch from "@/components/simple/IconSwitch";
import BaseButton from "@/components/simple/BaseButton";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PageContractWorkAgree",
  data: () => ({
    isFilterActive: false,
    isEditModalActive: false,
    isAgreeModalActive: false,
    checkBoxedRows: [],
    columns: [
      "position",
      "helicopters",
      "work",
      "workType",
      "quantity",
      "unit",
      "recipient",
      "standarts",
    ],
    page: 1,
    workTypes: null,
    units: null,
    helicopterTypes: null,
    recipients: null,
    works: null,
    standards: null,
    limit: 25,
    editForm: null,
    menuItems: [
      { name: "Редактировать", action: "edit-item" },
      { name: "Согласовать", action: "approve" },
      { name: "На доработку", action: "revision" },
    ],
  }),
  components: {
    Table,
    IconSwitch,
    BaseButton,
    ModalFilter: () => import("../../modals/ModalFilter"),
    ModalAgreement: () => import("../../modals/ModalAgreement"),
    SendAgree: () => import("../../modals/SendToAgree"),
  },
  mounted() {
    this.autoCompleteFields();

    if (!this.agreement) {
      this.getAgreement({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    }
  },
  computed: {
    // columns() {
    //   return this.agreement && Object.keys(this.agreement[0])
    // },
    ...mapGetters("contracts", {
      agreement: "agreement",
      helicoptersFilter: "helicopters",
      workTypesFilter: "workTypes",
      recipientsFilter: "recipients",
    }),
    contractId() {
      return +this.$route.params.id;
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
      getAgreement: "getAgreement",
      changeAgreementStatus: "changeAgreementStatus",
      getSupplyRecipient: "getSupplyRecipient", // Автозаполнение поля “Получатель”
      getSupplyWork: "getSupplyWork", // “Наименование работы”
      getSupplyStandart: "getSupplyStandart", //“НТД”
      getSupplyForm: "getSupplyForm",
    }),
    async approve(data){
      await this.changeAgreementStatus({
        contract: this.contractId,
        supplies: data.id ?[data.id] : data
      })
      this.getAgreement({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    },
    revision(){

    },
    closeModal() {
      this.editForm = null;
      this.isEditModalActive = false;
    },
    updateAndCloseModal() {
      this.closeModal();
      this.getAgreement({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    },
    editItem(formData) {
      this.editForm = {};

      for (let key in formData) {
        if (key === "helicopters" && formData[key].name) {
          this.editForm[key] = this.helicopterTypes.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }
        if (key === "workType" && formData[key].name) {
          this.editForm[key] = this.workTypes.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }
        if (key === "work" && formData[key].name) {
          this.editForm[key] = this.works.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        if (key === "unit" && formData[key].name) {
          this.editForm[key] = this.units.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        if (key === "recipient" && formData[key].name) {
          this.editForm[key] = this.recipients.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        if (key === "standards" && formData[key].name) {
          this.editForm[key] = this.standards.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        this.editForm[key] = formData[key];
      }

      this.isEditModalActive = true;
    },
    changeTableState({ page, limit }) {
      this.page = page;
      this.limit = limit;
      this.getAgreement({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    },
    autoCompleteFields: async function () {
      const [
        {
          data: { workTypes, units, helicopterTypes },
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
        this.getSupplyForm({ id: this.contractId }),
        this.getSupplyWork({ id: +this.contractId }),
        this.getSupplyRecipient({ id: +this.contractId }),
        this.getSupplyStandart({ id: +this.contractId }),
      ]);

      this.recipients = recipients;
      this.works = works;
      this.standards = standart;
      this.workTypes = workTypes;
      this.units = units;
      this.helicopterTypes = helicopterTypes;
    },
    filterAgrees(filter) {
      this.getAgreement({
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
.contract-agree {
  display: flex;
  flex-direction: column;
}
</style>
