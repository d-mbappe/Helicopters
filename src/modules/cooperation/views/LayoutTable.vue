<template>
<div>
  <div class="contract-list__table">
    <Table
      v-if="getLocalDataByName && getLocalDataByName.data && columns"
      :data="getLocalDataByName.data"
      :total="getLocalDataByName.total"
      :columns="columns"
      @change-table-state="changeTableState"
      @edit-item="editItem"
      @delete-item="deleteItem"
      :menu-items="menuItems"
      tableTitle="tableTitle"
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
        <IconSwitch name="filter" color="#90A0B7" :isButton="true" />
        <IconSwitch name="download" color="#90A0B7" :isButton="true" />
        <BaseButton
          :text="'Согласовать'"
          @click="isAgreeModalActive = true"
        />
      </template>
    </Table>
  </div>
  <FormModal
    v-if="isEditModalActive"
    @close="closeModal"
    @close-and-update="updateAndCloseModal"
    :fields="formFields"
    :editForm="editForm"
  />
  <!-- <send-agree v-if="isAgreeModalActive" @close="closeModal" /> -->
</div>

</template>

<script>
import Table from "@/components/common/Table";
import IconSwitch from "@/components/simple/IconSwitch";
import BaseButton from "@/components/simple/BaseButton";
import { mapGetters, mapActions } from "vuex";
import Select from "@/components/ui/Select";

export default {
  name: "LayoutTable",
  components: {
    Table,
    IconSwitch,
    BaseButton,
    Select,
    FormModal: () => import('../modals/FormModal'),
  },
  data: () => ({
    isEditModalActive: false,
    isAgreeModalActive: false,
    showForm: false,
    page: 1,
    limit: 25,
    agreed: true,
    sort_by: null,
    editForm: null,
    hideServerFields: ["id"],
    menuItems: [
      { name: "Редактировать", action: "edit-item" },
      { name: "Добавить в справочник", action: "approve" },
      { name: "Добавить в перечень", action: "revision" },
      { name: "Удалить", action: "delete" }
    ],
    // currentHelicopterNumber: '',
    // currentWorkType: '',
    // currentWorkSubType: '',
  }),
  // watch: {
  //   'form.helicopters': {
  //     async handler(newVal) {
  //       if(newVal) {
  //         this.currentHelicopterNumber = (await this.getHelicopterById({id: newVal[0].id})).data.data[0].number
  //       }
  //     },
  //     deep: true,
  //   },
  //   'form.work': {
  //     async handler(newVal) {
  //       if(newVal) {
  //         this.currentHelicopterNumber = (await this.getHelicopterById({id: newVal.id})).data.data[0].number
  //       }
  //     },
  //     deep: true,
  //   },
  //   'form.workType': {
  //     async handler(newVal) {
  //       if(newVal) {
  //         this.currentHelicopterNumber = (await this.getHelicopterById({id: newVal.id})).data.data[0].number
  //       }
  //     },
  //     deep: true,
  //   }
  // },
  mounted() {
    if (!this.getLocalDataByName) {
      this.fetchLocalDataByName();
    }
  },
  computed: {
    localDataName() {
      //записываем meta в переменную
      return this.$route.meta.SUBMODULE;
    },
    getLocalDataByName() {
      // чекаем данные по переменной
      return this.$store.getters[`cooperation/${this.localDataName}`];
    },
    contractId() {
      return Number(this.$route.params.id);
    },
    columns() { 
      return this.$config.catalog[this.localDataName].tableColumns
    },
    formFields() {
      return this.$config.catalog[this.localDataName].formFields
    },
    tableTitle() {
      return this.$route.meta.tableTitle;
    }
  },
  methods: {
      fetchLocalDataByName() {
        this.$store.dispatch(`cooperation/${this.localDataName}`, {
          page: this.page,
          limit: this.limit,
          agreed: this.agreed,
          sort_by: this.sortBy,
          sort: this.sortField, //desc | asc
        });
      },
    // ...mapActions("contracts", {
    //   fetchContractWorks: "fetchContractWorks",
    //   createContractWork: "createContractWork",
    //   getSupplyRecipient: "getSupplyRecipient", // Автозаполнение поля “Получатель”
    //   getSupplyWork: "getSupplyWork", // “Наименование работы”
    //   getSupplyStandart: "getSupplyStandart", //“НТД”
    //   getSupplyForm: "getSupplyForm",
    // }),
    // ...mapActions("catalog", {
    //   getHelicopterById: 'getHelicopterById',
    //   workType: 'workType',
    //   workName: 'workName',
    // }),
    // async addPosition(){
    //   const prepareFormBeforeSubmit = {};
    //   for (let key in this.form) {
    //     if (key === 'number') {
    //       prepareFormBeforeSubmit[number] = this.contractWorkPosition;
    //     }
    //     else if (key === 'components') {
    //       continue;
    //     } else if (this.form[key].id) {

    //       prepareFormBeforeSubmit[key] = this.form[key].id;
    //     } else if (Array.isArray(this.form[key])) {
    //       prepareFormBeforeSubmit[key] = this.form[key].map(item => item.id)
    //     } else {
    //         prepareFormBeforeSubmit[key] = this.form[key];
    //     }
    //   }
    //   await this.createContractWork({ form: prepareFormBeforeSubmit, contract: this.contractId })

    //   this.fetchContractWorks({
    //     id: this.contractId,
    //     page: this.page,
    //     limit: this.limit,
    //   })
    // },
    // deleteItem() {

    // },
    editItem(formData) {
      this.editForm = {};
      for (let key in formData) {
        if (key === "helicopters" && formData[key].name) {
          this.editForm[key] = this.helicopters.find(
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

        if (key === "standards" && formData[key].symbol) {
          this.editForm[key] = this.standards.find(
            (item) => item.name.includes(formData[key].symbol)
          );
          continue;
        }

        this.editForm[key] = formData[key];
      }

      this.isEditModalActive = true;
    },
    // closeModal() {
    //   this.editForm = null;
    //   this.isEditModalActive = false;
    // },
    // updateAndCloseModal() {
    //   this.closeModal();
    //   this.fetchContractWorks({
    //     id: this.contractId,
    //     page: this.page,
    //     limit: this.limit,
    //   });
    // },
    toggleForm() {
      const el = this.$refs.formBody;
      if (this.showForm) {
        el.style = `height: ${el.scrollHeight}px`;
        setTimeout(() => {
          el.style = "";
        }, 300);
      } else {
        el.style = `height: ${el.scrollHeight}px`;
        setTimeout(() => {
          el.style = `height: 100%`;
        }, 300);
      }
      this.showForm = !this.showForm;
    },
    // changeTableState({ page, limit }) {
    //   this.page = page;
    //   this.limit = limit;

    //   this.fetchContractWorks({
    //     id: this.contractId,
    //     page: this.page,
    //     limit: this.limit,
    //   });
    // // },
    // addNumber() {
    //   this.form.components.push(`Компонент ${this.form.components.length + 1}`);
    // },
  },
};
</script>

<style lang="scss" scoped>
.contract-list {
  display: flex;
  flex-direction: column;

  &__add {
    display: flex;
    flex-direction: column;
    background: $white;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 29px 65px 20px;
    margin-bottom: 20px;
    position: relative;
    &-top {
      display: flex;
      align-items: center;
      margin-bottom: 9px;
    }
    &-title {
      font-quantity: 18px;
      line-height: 21px;
      font-weight: 500;
      color: $table-black;
    }
    &-arrow {
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 20px;
      transform: rotate(180deg);
      transition: transform 0.3s;
      &.active {
        transform: rotate(0deg);
      }
    }
    &-body {
      display: flex;
      flex-direction: column;
      height: 0px;
      transition: height 0.3s;
    }
    &-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 40px;
    }
    &-add {
      color: $accent-blue;
      font-quantity: 13px;
      line-height: 15px;
      font-weight: 500;
      letter-spacing: 0.01em;
      text-decoration: none;
    }
    &-btns {
      display: flex;
      align-items: center;
      margin: 0px -5px;
    }
    &-btn {
      margin: 0px 5px;
      width: 152px;
    }
  }

  &__form {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 11px -17px -10px;
  }

  &__col {
    width: calc(100% / 3 - 34px);
    margin: 10px 17px;
  }
}
</style>
