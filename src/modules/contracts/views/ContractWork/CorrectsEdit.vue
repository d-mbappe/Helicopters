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
      <div class="corrects-edit__btns">
        <v-btn
          label="Загрузить документ"
          class="btn--primary btn--normal corrects-edit__btn"
        />
      </div>
    </div>

    <div class="corrects-edit__content">
      <div class="corrects-edit__title">Внести изменения</div>
      <div class="corrects-edit__blocks">
        <div class="corrects-edit__block">
          <div class="corrects-edit__subtitle">Общие сведения</div>
          <div class="corrects-edit__form" v-if="options">
            <div class="corrects-edit__col">
              <label class="supply_position_input__label"
                >Позиция по перечню ГК</label
              >
              <div
                class="supply_position_input inpt__input--default inpt__input"
              >
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
              <div class="form_error">{{ this.errors.position }}</div>
              <!-- <v-input
              label="Позиция по перечню ГК"
              v-model="contractWorkPosition"
              class-el="inpt__input--default"
              id="number"
            /> -->
            </div>
            <div class="corrects-edit__col">
              <Select
                v-if="options.helicopters"
                @input="
                  form.helicopters = null;
                  form.helicopters = $event;
                  !initialization ? (form.work = null) : '';
                "
                :value="form.helicopters"
                title="name"
                class="inpt__input--default"
                label="Тип ВТ"
                :multiple="true"
                :options="options.helicopters"
                id="helicopters"
              ></Select>
            </div>
            <div class="corrects-edit__col">
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
            <div class="corrects-edit__col">
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
            <div class="corrects-edit__col">
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
            <div class="corrects-edit__col">
              <v-input
                label="Объем работ"
                v-model.number="form.quantity"
                class-el="inpt__input--default"
                id="quantity"
              />
            </div>
            <div class="corrects-edit__col">
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
            <div class="corrects-edit__col">
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
          </div>
        </div>

        <div class="corrects-edit__block">
          <div class="corrects-edit__subtitle">Корректировка</div>
          <div class="corrects-edit__form">
            <div class="corrects-edit__col">
            <Input 
              id="add-date" 
              type="date" 
              label="Дата внесения"
              @input="changeDate"
              :value="moment(form.adjustment.date, 'DD.MM.YYYY').format('YYYY-MM-DD')"
              classEl="inpt__input--default"
            />

            </div>
            <div class="corrects-edit__col">
              <v-input
                label="Причина"
                v-model="form.adjustment.reason"
                class-el="inpt__input--default"
              />
            </div>
            <!-- <div class="corrects-edit__col">
              <v-input
                label="Решение"
                v-model="form.adjustment.answer"
                class-el="inpt__input--default"
              />
            </div> -->
          </div>
        </div>

        <div class="corrects-edit__block">
          <div class="corrects-edit__subtitle">Документ</div>
          <div class="corrects-edit__form">
            <div class="corrects-edit__col">
              <v-input
                label="Документ"
                v-model.number="form.adjustment.document"
                class-el="inpt__input--default"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="corrects-edit__footer">
        <div class="corrects-edit__btns">
          <v-btn
            label="Отменить"
            class="btn--cancel btn--normal corrects-edit__btn corrects-edit__btn--cancel"
          />
          <v-btn
            label="Изменить"
            @click="sendCorrects"
            class="btn--primary btn--normal corrects-edit__btn corrects-edit__btn--edit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Select from "@/components/ui/Select";
import Input from '@/components/ui/Input';
import { mapActions } from "vuex";
import moment from 'moment';

export default {
  name: "PageContractWorkCorrectsEdit",
  components: {
    Select,
    Input
  },
  data: () => ({
    options: null,
    moment: moment,
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
    currentWorkType: "",
    currentWorkSubType: "",
    currentWorkNumber: "",
    id: null,
    errors: [],
    initialization: true,
  }),
  mounted() {
    this.id = this.$route.params["id"];
    this.options = this.$route.params.options;

    for (let key in this.$route.params.editForm) {
      // if (this.prepareFields.includes(key)) {
      
      this.$set(this.form, key, this.$route.params.editForm[key]);
      // }
    }
    this.currentWorkNumber = this.$route.params.editForm["number"];
    this.id = this.$route.params.editForm["id"];
  },
  methods: {
    ...mapActions("contracts", {
      createAdjustment: "createAdjustment",
    }),
    changeDate(e) {
      this.form.adjustment.date = moment(e, 'YYYY-MM-DD').format('DD.MM.YYYY')
    },
    async sendCorrects() {
      const prepareFormBeforeSubmit = {};

      for (let key in this.form) {
        console.log(key);
        if (key === "number") {
          prepareFormBeforeSubmit["number"] = this.currentWorkNumber;
        } else if (key === "standards") {
          prepareFormBeforeSubmit[key] = [this.form[key].id];
        } else if (key === "helicopters") {
          prepareFormBeforeSubmit[key] = this.form[key].map((helicopter) => {
            console.log("helicopter", helicopter.id);
            return helicopter.id;
          });
        } else if (key === "checked" || key === "options" || key === "specialist" || key === "position" || key === "status") {
          continue;
        } else if (this.form[key].id) {
          prepareFormBeforeSubmit[key] = this.form[key].id;
        } else if (Array.isArray(this.form[key])) {
          prepareFormBeforeSubmit[key] = this.form[key].map((item) => item.id);
        } else {
          prepareFormBeforeSubmit[key] = this.form[key];
        }
      }

      await this.createAdjustment({
        supplyId: this.id,
        form: prepareFormBeforeSubmit,
        contractId: this.contractId,
      });
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
          if (!this.initialization) {
            this.$set(this.form, "work", null);
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
          if (!this.initialization) {
            this.$set(this.form, "work", null);
          }
          this.form.workType = this.workTypes.find(
            (workType) => workType.number === newVal && workType.type
          );
          this.currentWorkType = this.findSubTypeParent(this.form.workType.id);
          // this.form.workType = (
          //   await this.getWorkById({ id: newVal })
          // ).data.data[0];
        } catch {
          this.$set(this.errors, "position", "Номер не найден");
          setTimeout(() => {
            this.errors.position = null;
          }, 2000);
        }
      },
    },
    currentWorkNumber(newVal) {
      console.log(newVal);
    },
  },

  computed: {
    contractWorkPosition() {
      return `${this.currentContract}.${this.currentHelicopterNumber}.${this.currentWorkType}.${this.currentWorkSubType}.${this.currentWorkNumber}`;
    },
    prepareFields() {
      try {
        return this.fields.filter((field) => {
          return !this.hideServerFields.includes(field);
        });
      } catch (e) {
        console.log(e);
      }
    },
    contractId() {
      return Number(this.$route.params.id);
    },
    currentContract() {
      if (this.options?.contracts) {
        return this.options.contracts.data.find(
          (contract) => (contract.id = this.contractId)
        ).customer.number;
      }
    },
    currentHelicopterNumber: {
      get: function () {
        try {
          return this.form.helicopters[0].number;
        } catch {}
      },
      set: function (newVal) {
        if (!this.initialization) {
          this.form.work = null;
        }
        if (!newVal) {
          this.form.helicopters = null;
          return;
        }
        let helicopterByNumber = this.helicopters.find(
          (helicopter) => helicopter.number === newVal
        );
        if (helicopterByNumber) {
          this.$set(this.form, "helicopters", [helicopterByNumber]);
        } else {
          this.$set(this.form, "helicopters", null);
          this.$set(this.errors, "position", "Номер не найден"),
            setTimeout(() => {
              this.errors.position = null;
            }, 1000);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.contract-settles-executor__back {
  text-decoration: none;
  color: #109cf1;
}
.form_error {
  font-size: 12px;
  color: red;
  position: absolute;
  transform: translateY(-3px);
}
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
.corrects-edit {
  display: flex;
  flex-direction: column;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__btns {
    display: flex;
    align-items: center;
    margin: 0px -5px;
  }

  &__btn {
    margin: 0px 5px;
    width: 197px;
    &--cancel {
      width: 140px;
    }
    &--edit {
      width: 152px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    background: $white;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 29px 65px 20px;
  }

  &__title {
    font-size: 18px;
    line-height: 21px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: $table-black;
    margin-bottom: 30px;
  }

  &__blocks {
    display: flex;
    flex-direction: column;
  }

  &__block {
    display: flex;
    flex-direction: column;
    margin-bottom: 58px;
    &:last-child {
      margin-bottom: 0;
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

  &__subtitle {
    font-size: 15px;
    line-height: 18px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: $table-black;
    margin-bottom: 14px;
  }

  &__footer {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
