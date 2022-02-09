<template>
  <modal-layout @close="$emit('close')">
    <div class="add-contract">
      <div class="add-contract__top">
        <div class="add-contract__title">Контракт</div>

        <div class="add-contract__id">ID-000001</div>
      </div>

      <div class="add-contract__form">
        <div class="add-contract__line">
          <div class="add-contract__col">
            <v-input
              label="Номер Гос. Контракта"
              v-model="form.number"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-contract__col">
            <v-input
              label="Наименование"
              v-model="form.title"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-contract__col">
            <Select
              v-if="customers"
              v-model="form.customer"
              title="name"
              class="inpt__input--default"
              label="Заказчик"
              :options="customers"
              :searchable="true"
              id="customer"
            ></Select>
          </div>
        </div>

        <div class="add-contract__line">
          <div class="add-contract__col">
            <Input
              id="contract-date"
              type="date"
              label="Дата контракта"
              @input="changeDate"
              :value="moment(form.date, 'DD.MM.YYYY').format('YYYY-MM-DD')"
              classEl="inpt__input--default"
            />
            <!-- <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
    <p>Value: '{{ value }}'</p> -->
          </div>
          <div class="add-contract__col">
            <Input
              id="complete-date"
              type="date"
              label="Срок выполнения"
              @input="changeDeadline"
              :value="moment(form.deadline, 'DD.MM.YYYY').format('YYYY-MM-DD')"
              classEl="inpt__input--default"
            />
          </div>
          <div class="add-contract__col">
            <v-input
              label="Стоимость"
              v-model.number="form.price"
              class-el="inpt__input--default"
            />
          </div>
        </div>

        <div class="add-contract__title add-contract__title--subtitle">
          Объем финансирования
        </div>

        <div
          v-for="(item, i) in form.stages"
          :key="i"
          class="add-contract__block"
        >
          <div class="add-contract__line">
            <div class="add-contract__col">
              <v-input
                label="Ориентировочная цена год"
                v-model.number="item.year"
                class-el="inpt__input--default"
              />
            </div>
            <div class="add-contract__col">
              <v-input
                label="Ориентировочная цена"
                v-model.number="item.founding"
                class-el="inpt__input--default"
              />
            </div>
            <div class="add-contract__col">
              <v-input
                label="Ставка НДС"
                v-model="item.vat"
                class-el="inpt__input--default"
              />
            </div>
          </div>

          <div class="add-contract__line">
            <div class="add-contract__col">
              <v-input
                label="Собственные расходы, %"
                v-model="item.hr"
                class-el="inpt__input--default"
              />
            </div>
            <!-- <div class="add-contract__col">
              <v-input
                label="Прибыль, %"
                v-model="item.profit"
                class-el="inpt__input--default"
              />
            </div>
            <div class="add-contract__col">
              <v-input
                label="Прибыль от собственных расходов, %"
                v-model="item.profit2"
                class-el="inpt__input--default"
              />
            </div> -->
          </div>
        </div>
        <div class="add-contract__line">
          <div class="add-contract__col">
            <Select
              v-if="statuses"
              v-model="form.status"
              title="name"
              class="inpt__input--default"
              label="Статус"
              :options="contracts.statuses"
              id="status"
            ></Select>
          </div>
        </div>
      </div>

      <div class="add-contract__footer">
        <div @click="addItem()" class="add-contract__point">
          Добавить этап объем финансирования
        </div>

        <div class="add-contract__btns">
          <v-btn
            label="Отменить"
            @click="$emit('close')"
            class="btn--cancel btn--normal add-contract__btn add-contract__btn--cancel"
          />
          <v-btn
            label="Сохранить"
            @click="editForm ? updatePosition() : addPosition()"
            class="btn--primary btn--normal add-contract__btn add-contract__btn--save"
          />
        </div>
      </div>
    </div>
  </modal-layout>
</template>

<script>
import ModalLayout from "@/components/common/ModalLayout";
import Select from "@/components/ui/Select";
import Input from '@/components/ui/Input';
import moment from 'moment';

import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddContract",
  components: {
    ModalLayout,
    Select,
    Input
  },
  data: () => ({
    statuses: [],
    customers: [],
    id: null,
    moment: moment,
    form: {
      number: "",
      name: "",
      customer: null,
      date: null,
      deadline: null,
      price: null,
      status: null,
      stages: [
        {
          year: null,
          founding: null,
          vat: null,
          hr: null,
          // 'profit': 'disabled',
          // 'profit2': 'disabled'
        },
      ],
    },
  }),
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    editForm: {
      type: Object,
      required: false,
    },
  },
  async mounted() {
    const {
      data: { statuses, customers },
    } = await this.сontractForm({
      id: this.id,
    });
    this.statuses = statuses;
    this.customers = customers;

    if (this.editForm) {
      for (let key in this.editForm) {
        if(key ==='status') {
          this.form[key] = this.statuses.find(status => this.form[key].name === status.name)
        }
        // if (this.prepareFields.includes(key)) {
          this.form[key] = this.editForm[key];
        // }
      }
      this.id = this.editForm["id"];
    }

  },
  computed: {
    ...mapGetters("contracts", {
      contracts: "contracts",
    }),
    // prepareFields() {
    //   try {
    //     return this.fields.filter((field) => {
    //       return !this.hideServerFields.includes(field);
    //     });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    contractId() {
      return Number(this.editForm.id);
    },
  },
  methods: {
    ...mapActions("contracts", {
      сontractForm: "сontractForm",
    }),
    changeDate(e) {
      this.form.date = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD')
    },
    changeDeadline(e) {
      this.form.deadline = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD')
    },
    addItem() {
      this.form.stages.push({
        year: null,
        founding: null,
        vat: null,
        hr: null,
        // 'profit': 'disabled',
        // 'profit2': 'disabled'
      });
    },
    async addPosition() {
      const prepareFormBeforeSubmit = {};
      for (let key in this.form) {
        if (key === 'title') {
          prepareFormBeforeSubmit['name'] = this.form['title']
        } else if (this.form[key] && this.form[key].id) {
          prepareFormBeforeSubmit[key] = this.form[key].id;
        } else {
          prepareFormBeforeSubmit[key] = this.form[key];
        }
      }

      await this.$store.dispatch("contracts/createContract", {
        form: prepareFormBeforeSubmit,
      });
      this.$emit("close-and-update");
    },


    async updatePosition() {
      const prepareFormBeforeSubmit = {};
      for (let key in this.form) {
        if (key === 'title') {
          prepareFormBeforeSubmit['name'] = this.form['title']
        } else if (this.form[key] && this.form[key].id) {
          prepareFormBeforeSubmit[key] = this.form[key].id;
        } else if (key === 'id') {
          continue;
        } else {
          prepareFormBeforeSubmit[key] = this.form[key];
        }
      }
      console.log(prepareFormBeforeSubmit)
      await this.$store.dispatch(`contracts/updateContract`, {
        id: this.id,
        form: prepareFormBeforeSubmit,
      });
      this.$emit("close-and-update");
    },
  },
};
</script>

<style lang="scss" scoped>
.add-contract {
  width: 1108px;
  padding: 38px 69px 20px 65px;
  background: $white;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  &__title {
    font-size: 18px;
    line-height: 21px;
    font-weight: 500;
    color: $table-black;
    letter-spacing: 0.01em;
    &--subtitle {
      margin-bottom: 20px;
    }
  }

  &__id {
    font-size: 13px;
    line-height: 15px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: #a5acb1;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__block {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__line {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0px -17px 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__col {
    margin: 0 17px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
  }

  &__point {
    cursor: pointer;
    font-size: 13px;
    line-height: 15px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: $accent-blue;
  }

  &__btns {
    display: flex;
    align-items: center;
    margin: 0px -5px;
  }
  &__btn {
    margin: 0px 5px;
    &--cancel {
      width: 140px;
    }
    &--save {
      width: 152px;
    }
  }
}
</style>
