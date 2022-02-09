<template>
  <modal-layout @close="$emit('close')">
    <div class="add-work">
      <div class="add-work__title">Изменить работу</div>

      <div class="add-work__form">
        <div class="add-work__col">
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
        <div class="add-work__col">
          <Select
            v-if="options.helicopters"
            @input="form.helicopters = null; form.helicopters = $event; !initialization ? form.work = null : '';"
            :value="form.helicopters"
            title="name"
            class="inpt__input--default"
            label="Тип ВТ"
            :multiple="true"
            :options="options.helicopters"
            id="helicopters"
          ></Select>
        </div>
        <div class="add-work__col">
          <Select
            v-if="options.workTypes"
            v-model="form.workType"
            title="name"
            class="inpt__input--default"
            label="Вид работы"
            :options="options.workTypes"
            id="workType"
          ></Select>
        </div>
        <div class="add-work__col">
          <Select
            v-if="options.works"
            v-model="form.work"
            title="name"
            class="inpt__input--default"
            label="Наименование работ"
            :options="options.works"
            :searchable="true"
            id="work"
          ></Select>
        </div>
        <div class="add-work__col">
          <Select
            v-if="options.units"
            v-model="form.unit"
            title="name"
            class="inpt__input--default"
            label="Ед.изм."
            :options="options.units"
            id="unit"
          ></Select>
        </div>
        <div class="add-work__col">
          <v-input
            label="Объем работ"
            v-model.number="form.quantity"
            class-el="inpt__input--default"
            id="quantity"
          />
        </div>
        <div class="add-work__col">
          <Select
            v-if="options.recipients"
            v-model="form.recipient"
            title="name"
            class="inpt__input--default"
            label="Получатель"
            :options="options.recipients"
            id="recipient"
          ></Select>
        </div>
        <div class="add-work__col">
          <Select
            v-if="options.standards"
            v-model="form.standards"
            title="name"
            class="inpt__input--default"
            label="НТД"
            :options="options.standards"
            id="standards"
          ></Select>
        </div>
        <div
          v-for="(item, i) in form.components"
          :key="i"
          class="add-work__col"
        >
          <v-input
            label="Номер изделия"
            v-model="form.components[i]"
            class-el="inpt__input--default"
          />
        </div>
      </div>

      <div class="add-work__footer">
        <a @click.prevent="addNumber()" href="#" class="add-work-add">
          Добавить поле номер изделия
        </a>

        <BaseButton
          text="Отменить"
          class="add-work__btn add-work__cancel"
          @click="$emit('close')"
        />
        <BaseButton
          text="Изменить"
          class="add-work__btn add-work__add"
          @click="updatePosition"
        />
      </div>
    </div>
  </modal-layout>
</template>

<script>
import ModalLayout from "@/components/common/ModalLayout";
import BaseButton from "@/components/simple/BaseButton";
import Select from "@/components/ui/Select";

export default {
  name: "EditWork",
  components: {
    ModalLayout,
    BaseButton,
    Select,
  },
  data: () => ({
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
    },
    currentWorkType: "",
    currentWorkSubType: "",
    currentWorkNumber: "",
    id: null,
    errors: [],
    initialization: true,
  }),
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    fields: {
      type: Array,
      required: true,
    },
    editForm: {
      type: Object,
      required: false,
    },
  },
  watch: {
    "form.workType": {
      async handler(newVal) {
        if (newVal) {
          if (this.changeInProgress) {
            this.changeInProgress--;
            return;
          }
          this.changeInProgress = 1; // 1 поле в процессе изменения, заморозить обратный watcher
          if(!this.initialization) {
            this.$set(this.form, 'work', null)
          }
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
          if(!this.initialization) {
            this.$set(this.form, 'work', null)
          }
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
  mounted() {
    if (this.editForm) {
      for (let key in this.editForm) {
      // if (this.prepareFields.includes(key)) {
        this.form[key] = this.editForm[key];
      // }
      }
      // let helicopterByNumber = this.options.helicopters.find(helicopter => helicopter.number === newVal)
      // if (helicopterByNumber) {
      //   this.$set(this.form, 'helicopters', [helicopterByNumber])
      // }
      this.currentWorkNumber = this.editForm["number"];
      this.id = this.editForm["id"];
    }
    setTimeout(() => {
      this.initialization = false
    }, 500);
  },
  computed: {
    contractWorkPosition() {
      return `${this.currentContract}.${this.currentHelicopterNumber}.${this.currentWorkType}.${this.currentWorkSubType}.${this.currentWorkNumber}`;
    },
    prepareFields() {
      return this.fields
    },
    contractId() {
      return Number(this.$route.params.id);
    },
    currentContract() {
      if (this.options.contracts) {
        return this.options.contracts.data
          .find((contract) => (contract.id = this.contractId))
          .customer.number
      }
    },
    currentHelicopterNumber: {
      get: function () {
        try {
          return this.form.helicopters[0].number
        } catch {}
      },
      set: function (newVal) {
        if(!this.initialization) {
          this.form.work = null;
        }
        if (!newVal) {
          this.form.helicopters = null;
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
  },
  methods: {
    addNumber() {
      this.form.components.push(`Компонент ${this.form.components.length + 1}`);
    },
    findSubTypeParent(subTypeid) {
      let indexOfSelectedSubWorkType = this.options.workTypes.findIndex(
        (workType) => workType.id === subTypeid
      );
      for (let i = indexOfSelectedSubWorkType; i >= 0; i--) {
        if (this.options.workTypes[i].name[0] === "-") {
          continue;
        }
        return this.options.workTypes[i].number;
      }
    },
    async updatePosition() {
      const prepareFormBeforeSubmit = {};

      for (let key in this.form) {
        console.log(key)
        if (key === "number") {
          prepareFormBeforeSubmit["number"] = this.currentWorkNumber;
        } else if (key === "standards") {
          prepareFormBeforeSubmit[key] = [this.form[key].id]
        } else if (key === "helicopters") {
          prepareFormBeforeSubmit[key] = this.form[key].map(helicopter => {
            console.log('helicopter', helicopter.id)
            return helicopter.id
          });
        } else if (key === "checked" || key === "options" || key === "id") {
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

      console.log('helicoptersForm', prepareFormBeforeSubmit)
      await this.$store.dispatch(`contracts/updateContractWork`, {
        id: this.id,
        form: prepareFormBeforeSubmit,
        contract: this.contractId,
      });
      this.$emit("close-and-update");
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
.add-work {
  width: 1108px;
  padding: 20px 65px;
  background: $white;

  &__title {
    margin-top: 9px;
    font-size: 18px;
    line-height: 15px;
    font-weight: 500;
    color: $table-black;
    letter-spacing: 0.01em;
    margin-bottom: 30px;
  }

  &__form {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: -10px -17px;
  }

  &__col {
    width: calc(100% / 3 - 34px);
    margin: 10px 17px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 40px -5px 0;
  }
  &-add {
      color: $accent-blue;
      font-size: 13px;
      line-height: 15px;
      font-weight: 500;
      letter-spacing: 0.01em;
      text-decoration: none;
  }
  &__btn {
    width: 152px;
    margin: 0px 5px;
  }
}
.form_error {
  font-size: 12px;
  color: red;
  position: absolute;
  transform: translateY(-3px);

}
</style>
