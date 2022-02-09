<template>
  <div class="contract-list">
    <div class="contract-list__top">
      <div class="contract-list__btns">
        <v-btn
          @click="isModal = true"
          label="Назначить ответственного"
          class="btn--primary btn--normal contract-list__btn"
          :disabled="!checkBoxedRows.length"
        />
      </div>
    </div>

    <div class="contract-list__table">
      <Table
        v-if="specialists && columns"
        :data="specialists.data"
        :columns="columns"
        :total="specialists.total"
        @change-table-state="changeTableState"
        tableTitle="Таблица распределение работ"
        @set-responsible="editItem"
        @select-rows="checkBoxedRows = $event"
        :menu-items="menuItems"
        commonDots
        commonCheckbox
        rowCheckbox
        rowDots
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

    <add-responsible v-if="isModal" @close="closeModal" @close-and-update="updateAndCloseModal" :work-ids="checkBoxedRows"/>
    <ModalFilter
        v-if="isFilterActive"
        type="specialist"
        :data="filterData"
        :filters="getFilters"
        @close-filter-modal="isFilterActive = false"
        @filter-save="filterDistrutions($event)"
    />
  </div>
</template>

<script>
import Table from "@/components/common/Table";
import IconSwitch from "@/components/simple/IconSwitch";
import ModalFilter from "../../modals/ModalFilter";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PageContractWorkDistribution",
  components: {
    Table,
    IconSwitch,
    ModalFilter,
    AddResponsible: () => import("../../modals/AddResponsible"),
  },
  data: () => ({
    isModal: false,
    page: 1,
    limit: 25,
    editForm: null,
    checkBoxedRows: [],
    isFilterActive: false,
    specialistsFilter: null,
    columns: [
      "position",
      "helicopters",
      "work",
      "workType",
      "quantity",
      "unit",
      "recipient",
      "standarts",
      "specialist",
    ],
    menuItems: [
      { name: "Назначить ответственного", action: "set-responsible" },
      // { name: "Согласовать", action: "approve" },
      // { name: "На доработку", action: "revision" },
    ],
  }),
  computed: {
    ...mapGetters("contracts", {
      specialists: "specialists",
      specialistsList: "specialistsList",
      helicoptersFilter: "helicopters",
      workTypesFilter: "workTypes",
      recipientsFilter: "recipients",
    }),
    test() {
      return this.checkBoxedRows.length;
    },
    contractId() {
      return +this.$route.params.id;
    },
    getModuleName() {
      return this.$route.meta.MODULE;
    },
    getSubModule() {
      return this.$route.meta.SUBMODULE;
    },
    getFilters() {
      return this.$config[this.getModuleName][this.getSubModule].filters
    },
    filterData() {
      return {
        helicopters: this.helicoptersFilter,
        workTypes: this.workTypesFilter,
        specialists: this.specialistsList,
      }
    },
  },
  async mounted() {
    this.getSpecialistForm({ id: this.contractId });

    if (!this.specialists) {
      this.getSpecialists({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    }
  },
  methods: {
    closeModal() {
      this.isModal = false;
    },
    updateAndCloseModal() {
      this.closeModal();
      this.getSpecialists({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    },
    ...mapActions("contracts", {
      getSpecialists: "getSpecialists",
      getSpecialistForm: "getSpecialistForm",
    }),
    editItem(formData) {
      this.checkBoxedRows = [formData.id]
      // this.editForm = {};
      // this.editForm['id'] = formData['id'];
      this.isModal = true;
    },
    changeTableState({ page, limit }) {
      this.page = page;
      this.limit = limit;

      this.getSpecialists({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    },
    filterDistrutions(filter) {
      this.getSpecialists({
        id: this.contractId,
        page: this.page,
        limit: this.limit,

        filter: filter,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.contract-list {
  display: flex;
  flex-direction: column;

  &__top {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  &__btns {
    display: flex;
    align-items: center;
  }

  &__btn {
    width: 220px;
  }
}
</style>
