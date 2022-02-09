<template>
  <div class="contract-list">
    <div class="contract-list__add">
      <div class="contract-list__add-top">
        <div class="contract-list__add-title">Добавить в работу</div>

        <div
          @click="toggleForm()"
          :class="{ active: !showForm }"
          class="contract-list__add-arrow"
        >
          <img src="@/assets/svg/dropdown.svg" />
        </div>
      </div>

      <div ref="formBody" class="contract-list__add-body">
        <div class="contract-list__form">
          <div class="contract-list__col">
            <label class="supply_position_input__label"
              >Позиция по перечню ГК</label
            >
            <div class="supply_position_input inpt__input--default inpt__input">
              <input
                type="text"
                v-model.number="currentContract"
                placeholder="___"
                class="disabled"
                disabled
              />.
              <input
                type="text"
                v-model.number.lazy="currentHelicopterNumber"
                placeholder="___"
              />.
              <input
                type="text"
                v-model.number="currentWorkType"
                placeholder="___"
                class="disabled"
                disabled
              />.
              <input
                type="text"
                v-model.number="currentWorkSubType"
                placeholder="___"
              />.
              <input
                type="text"
                v-model.number="currentWorkNumber"
                placeholder="___"
              />
            </div>
            <div class="form_error">{{this.errors.position}}</div>
            <!-- <v-input
              label="Позиция по перечню ГК"
              v-model="contractWorkPosition"
              class-el="inpt__input--default"
              id="number"
            /> -->
          </div>
          <div class="contract-list__col">
            <Select
              v-if="helicopters"
              @input="form.helicopters = null; form.helicopters = $event; form.work = null;"
              :value="form.helicopters"
              title="name"
              class="inpt__input--default"
              label="Тип ВТ"
              :multiple="true"
              :options="helicopters"
              id="helicopters"
            ></Select>
          </div>
          <div class="contract-list__col">
            <Select
              v-if="workTypes"
              v-model="form.workType"
              title="name"
              class="inpt__input--default"
              label="Вид работы"
              :options="workTypes"
              id="workType"
            >
            </Select>
          </div>
          <div class="contract-list__col">
            <Select
              v-if="works"
              v-model="form.work"
              title="name"
              class="inpt__input--default"
              label="Наименование работ"
              :options="works"
              :searchable="true"
              id="work"
            ></Select>
          </div>
          <div class="contract-list__col">
            <Select
              v-if="units"
              v-model="form.unit"
              title="name"
              class="inpt__input--default"
              label="Ед.изм."
              :options="units"
              id="unit"
            ></Select>
          </div>
          <div class="contract-list__col">
            <v-input
              label="Объем работ"
              v-model.number="form.quantity"
              class-el="inpt__input--default"
              id="quantity"
            />
          </div>
          <div class="contract-list__col">
            <Select
              v-if="recipients"
              v-model="form.recipient"
              title="name"
              class="inpt__input--default"
              label="Получатель"
              :options="recipients"
              id="recipient"
            ></Select>
          </div>
          <div class="contract-list__col">
            <Select
              v-if="standards"
              v-model="form.standards"
              title="name"
              class="inpt__input--default"
              label="НТД"
              multiple
              :options="standards"
              id="standards"
            ></Select>
          </div>
          <div
            v-for="(item, i) in form.components"
            :key="i"
            class="contract-list__col"
          >
            <v-input
              label="Номер изделия"
              v-model="form.components[i]"
              class-el="inpt__input--default"
            />
          </div>
        </div>

        <div class="contract-list__add-footer">
          <a
            @click.prevent="addNumber()"
            href="#"
            class="contract-list__add-add"
          >
            Добавить поле номер изделия
          </a>

          <div class="contract-list__add-btns">
            <v-btn
              @click="clearPosition"
              label="Отменить"
              class="btn--cancel btn--normal contract-list__add-btn"
            />
            <v-btn
              @click="addPosition"
              label="Сохранить"
              class="btn--primary btn--normal contract-list__add-btn"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="contract-list__table">
      <Table
        v-if="contractWorks"
        :data="contractWorks.data"
        :total="contractWorks.total"
        :columns="columns"
        @change-table-state="changeTableState"
        @change-table-sort="changeTableSort"
        @edit-item="editItem"
        @delete-item="deleteItem"
        @select-rows="checkBoxedRows = $event"
        @approve="approve"
        :menu-items="menuItems"
        tableTitle="Таблица формирование перечня"
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
          <div @click="downloadFile">
            <IconSwitch name="download" color="#90A0B7" :isButton="true" />
          </div>
          <BaseButton
            :text="'Согласовать'"
            :isDisabled="!checkBoxedRows.length"
            @click="isAgreeModalActive = true"
          />
        </template>
      </Table>
    </div>
    <ModalFilter
      v-if="isFilterActive"
      :data="filterData"
      :filters="getFilters"
      @close-filter-modal="isFilterActive = false"
      @filter-save="filterWorks($event)"
      @filter="filterUpdate"
    />
    <edit-work
      v-if="isEditModalActive"
      @close="closeModal"
      @close-and-update="updateAndCloseModal"
      :fields="columns"
      :editForm="editForm"
      :hide-server-fields="hideServerFields"
      :options="{
        workTypes,
        units,
        helicopters,
        recipients,
        works,
        standards,
        contracts,
      }"
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
import ModalFilter from "../../modals/ModalFilter.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Select from "@/components/ui/Select";
import { config } from "@/config/index";

export default {
  name: "PageContractWorkList",
  components: {
    Table,
    IconSwitch,
    BaseButton,
    ModalFilter,
    Select,
    SendAgree: () => import("../../modals/SendToAgree"),
    EditWork: () => import("../../modals/EditWork"),
  },
  data: () => ({
    checkBoxedRows: [],
    isEditModalActive: false,
    isAgreeModalActive: false,
    workTypes: null,
    units: null,
    helicopters: [],
    recipients: null,
    works: null,
    standards: null,
    showForm: false,
    page: 1,
    limit: 25,
    editForm: null,
    config: config,
    hideServerFields: ["id"],
    menuItems: [
      { name: "Редактировать", action: "edit-item" },
      { name: "Согласовать", action: "approve" },
      { name: "На доработку", action: "revision" },
      { name: "Удалить", action: "delete" },
    ],
    form: {
      number: "123",
      helicopters: null,
      workType: null,
      work: null,
      unit: null,
      quantity: null,
      recipient: null,
      standards: null,
      components: ["Компонент 1"], // api?
    },
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
    // currentHelicopterNumber: "",
    currentWorkType: "",
    currentWorkSubType: "",
    currentWorkNumber: "",
    sortField: "",
    isFilterActive: false,
    filters: {},
    changeInProgress: 0,
    errors: []
  }),
  watch: {
    "form.workType": {
      async handler(newVal) {
        if (newVal) {
          if (this.changeInProgress) {
            this.changeInProgress--;
            return;
          }
          this.changeInProgress = 1; // 1 поле в процессе изменения, заморозить обратный watcher
          this.$set(this.form, 'work', null)
          this.currentWorkSubType = newVal.number;
          this.currentWorkType = this.findSubTypeParent(newVal.id);
        }
      },
      deep: true,
    },
    currentWorkSubType: {
      async handler(newVal) {
        try {
          if (this.changeInProgress) {
            this.changeInProgress--;
            return;
          }
          this.changeInProgress = 1;
          this.$set(this.form, 'work', null)
          this.form.workType = this.workTypes.find(
            (workType) => workType.number === newVal && workType.type
          );
          this.currentWorkType = this.findSubTypeParent(this.form.workType.id);
          // this.form.workType = (
          //   await this.getWorkById({ id: newVal })
          // ).data.data[0];
        } catch {
          this.$set(this.errors, 'position', 'Номер не найден')
          setTimeout(() => {
            this.errors.position = null
          }, 2000);
        }
      },
    },
    currentWorkNumber(newVal) {
      console.log(newVal);
    },
  },
  async mounted() {
    this.toggleForm();
    this.autoCompleteFields();

    if (!this.contractWorks) {
      this.fetchContractWorks({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    }

    this.currentWorkNumber =
      Number(
        await this.getContractWorkById({
          id: this.contractId,
          filter: {
            order: "desc",
            order_by: "number",
          },
          limit: 1,
        })
      ).data.data[0].number + 1;
  },
  
  computed: {
    ...mapGetters("contracts", {
      contractWorks: "contractWorks",
      contracts: "contracts",
      helicoptersFilter: "helicopters",
      workTypesFilter: "workTypes",
      recipientsFilter: "recipients",
    }),
    ...mapGetters("catalog", {
      testR: "recipient"
    }),
    // contractWorks: () => [],
    currentHelicopterNumber: {
      get: function () {
        if (this.form.helicopters?.[0]?.number) {
          return this.form.helicopters[0].number
        }
      },
      set: function (newVal) {
        this.form.work = null;
        if (!newVal) {
          this.form.helicopters = null;1
          return
        }
        let helicopterByNumber = this.helicopters.find(helicopter => helicopter.number === newVal)
        if (helicopterByNumber) {
          this.$set(this.form, 'helicopters', [helicopterByNumber])
        } else {
          this.$set(this.form, 'helicopters', null)
          this.$set(this.errors, 'position', 'Номер не найден'),
            setTimeout(() => {
              this.errors.position = null
            }, 1000)
        }
      }
    },
    getModuleName() {
      return this.$route.meta.MODULE;
    },
    getSubModule() {
      return this.$route.meta.SUBMODULE;
    },
    getFilters() {
      return this.config[this.getModuleName][this.getSubModule].filters;
    },
    currentContract() {
      if (this.contracts) {
        return this.contracts.data
          .find((contract) => (contract.id = this.contractId))
          .customer.number
      }
    },
    contractId() {
      return Number(this.$route.params.id);
    },
    contractWorkPosition() {
      return `${this.currentContract}.${this.currentHelicopterNumber}.${this.currentWorkType}.${this.currentWorkSubType}.${this.currentWorkNumber}`;
    },
    filterData() {
      return {
        helicopters: this.helicoptersFilter,
        workTypes: this.workTypesFilter,
        recipients: this.recipientsFilter,
        // recipients: this.testR.data,
      }
    },
  },

  methods: {
    ...mapActions("contracts", {
      changeAgreementStatus: "changeAgreementStatus",
      fetchContractWorks: "fetchContractWorks",
      createContractWork: "createContractWork",
      getSupplyRecipient: "getSupplyRecipient", // Автозаполнение поля “Получатель”
      getSupplyWork: "getSupplyWork", // “Наименование работы”
      getSupplyStandart: "getSupplyStandart", //“НТД”
      getSupplyForm: "getSupplyForm",
      exportSupply: "exportSupply",
      getContractWorkById: "getContractWorkById",
    }),
    ...mapActions("catalog", {
      getHelicopterById: "getHelicopterById",
      getWorkById: "getWorkById",
      getSubWorkById: "getSubWorkById",
      form_workTypeForm: "form_workTypeForm",
    }),
    ...mapMutations("contracts", {
      changeHelicopters: "changeHelicopters",
      changeWorkTypes: "changeWorkTypes",
      changeRecipients: "changeRecipients",
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
    filterUpdate(val) {
      this.$store.dispatch(`catalog/recipient`, {
        page: this.page,
        limit: this.limit,
        q: val
      });
    },
    filterWorks(filter) {
      this.fetchContractWorks({
        id: this.contractId,
        page: this.page,
        limit: this.limit,

        filter: filter,
      })
    },
    findSubTypeParent(subTypeid) {
      let indexOfSelectedSubWorkType = this.workTypes.findIndex(
        (workType) => workType.id === subTypeid
      );
      for (let i = indexOfSelectedSubWorkType; i >= 0; i--) {
        if (this.workTypes[i].name[0] === "-") {
          continue;
        }
        return this.workTypes[i].number;
      }
    },
    async downloadFile() {
      await this.exportSupply({ id: this.contractId, filter: this.filters });
    },
    clearPosition() {
      this.form = {
        number: "",
        helicopters: null,
        workType: null,
        work: null,
        unit: null,
        quantity: null,
        recipient: null,
        standards: null,
        components: ["Компонент 1"],
      };
      this.toggleForm();
    },
    async addPosition() {
      const prepareFormBeforeSubmit = {};

      for (let key in this.form) {
        if (key === "number") {
          prepareFormBeforeSubmit["number"] = this.currentWorkNumber;
        } else if (key === "helicopters") {
          prepareFormBeforeSubmit[key] = this.form[key].map(helicopter => helicopter.id);
        } else if (key === "components") {
          continue;
        } else if (this.form[key].id) {
          prepareFormBeforeSubmit[key] = this.form[key].id;
        } else if (Array.isArray(this.form[key])) {
          prepareFormBeforeSubmit[key] = this.form[key].map((item) => item.id);
        } else {
          prepareFormBeforeSubmit[key] = this.form[key];
        }
      }
      prepareFormBeforeSubmit["position"] =  this.contractWorkPosition
      await this.createContractWork({
        form: prepareFormBeforeSubmit,
        contract: this.contractId,
      });

      this.fetchContractWorks({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    },
    deleteItem() {},
    async editItem(formData) {
      this.editForm = {};

      // await this.getSupplyForm({contractId: this.contractId, supplyId: formData.id});

      for (let key in formData) {
        if (key === "helicopters" && formData[key].length) {
          const helicoptersResult = [];
          formData[key].forEach(helicopterObjWitchName => { helicoptersResult
              .push(this.helicopters
              .find(helicopterFullObject =>
              helicopterFullObject.name.substr(2) === helicopterObjWitchName.name ||
              helicopterFullObject.name === helicopterObjWitchName.name
              ))
          })
          this.editForm[key] = helicoptersResult;
          continue;
        }
        if (key === "workType" && formData[key].name) {
          this.editForm[key] = this.workTypes.find(
            (item) => item.name.substr(2) === formData[key].name
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

        if (key === "standards" && formData['standards']?.[0]?.symbol) {
          this.editForm[key] = this.standards.find((item) => {
            return this.deleteBraces(item.name).includes(formData['standards'][0].symbol)
          });
          continue;
        }

        if (key === "components" && formData[key]?.[0]?.name) {
          this.editForm[key] = [formData[key][0].name]
          continue;
        }

        this.editForm[key] = formData[key];
      }
      this.isEditModalActive = true;
    },
    deleteBraces(string) {
      var regExpDelBrackets = /[()]/g;
      return string.replace(regExpDelBrackets, "");
    },
    closeModal() {
      this.editForm = null;
      this.isEditModalActive = false;
    },
    updateAndCloseModal() {
      this.closeModal();
      this.fetchContractWorks({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    },
    autoCompleteFields: async function () {
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
        this.getSupplyForm({ contractId: this.contractId }),
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

      //запись в store
      this.changeHelicopters({ helicopters });
      this.changeWorkTypes({ workTypes });
      this.changeRecipients({ recipients });
    },
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
    changeTableState({ page, limit }) {
      this.page = page;
      this.limit = limit;

      this.fetchContractWorks({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    },
    changeTableSort(field) {
      console.log("parentSort", field);
      this.sortField = this.fetchContractWorks({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
        sort: "asc",
        sort_by: field,
      });
    },
    addNumber() {
      this.form.components.push(`Компонент ${this.form.components.length + 1}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.supply_position_input {
  display: flex;
  border-bottom: 1px solid #d3d8dd;
  height: 30px;
  padding: 0;
  font-size: 15px;
  line-height: 18px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: #323c47;
  background: #ffffff;
  align-items: center;
  & input {
    border: none;
    width: 52px;
    text-align: center;
  }
  &__label {
    font-size: 12px;
    line-height: 14px;
    color: #90a0b7;
    letter-spacing: 0.01em;
  }
}
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
      overflow: hidden;
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
.form_error {
  font-size: 12px;
  color: red;
  position: absolute;
  transform: translateY(-3px);

}
</style>
