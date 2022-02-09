<template>
  <modal-layout @close="$emit('close')">
    <div class="modal-agreement">
      <div class="modal-agreement__top">
        <div class="modal-agreement__title">Общие сведения</div>
      </div>

      <div class="modal-agreement__form">
        <div class="modal-agreement__line">
          <div class="modal-agreement__col">
            <v-input
              label="Позиция по перечню ГК"
              v-model="form.position"
              class-el="inpt__input--default"
            />
          </div>
          <div class="modal-agreement__col">
            <Select
              v-if="options.helicopterTypes"
              v-model="form.helicopters"
              title="name"
              class="inpt__input--default"
              label="Тип ВТ"
              :options="options.helicopterTypes"
              id="helicopters"
            ></Select>
          </div>
          <div class="modal-agreement__col">
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
        </div>

        <div class="modal-agreement__line">
          <div class="modal-agreement__col">
            <Select
              v-if="options.works"
              v-model="form.work"
              title="name"
              class="inpt__input--default"
              label="Наименование работ"
              :options="options.works"
              id="work"
            ></Select>
          </div>
          <div class="modal-agreement__col">
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
          <div class="modal-agreement__col">
            <v-input
              label="Объем работ"
              v-model.number="form.quantity"
              class-el="inpt__input--default"
              id="quantity"
            />
          </div>
        </div>

        <div class="modal-agreement__line">
          <div class="modal-agreement__col">
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
          <div class="modal-agreement__col">
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

      <div class="modal-agreement__footer">
        <div class="modal-agreement__btns">
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
    </div>
  </modal-layout>
</template>

<script>
import ModalLayout from "@/components/common/ModalLayout";
import BaseButton from "@/components/simple/BaseButton";
import Select from "@/components/ui/Select";

export default {
  name: "ModalAgreement",
  components: {
    ModalLayout,
    BaseButton,
    Select,
  },
  data() {
    return {
      form: {
        number: "",
        helicopters: null,
        workType: null,
        work: null,
        unit: null,
        quantity: null,
        recipient: null,
        standards: null,
      },
      id: null,
    };
  },
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
    mounted() {
    // if (this.editForm) {
    for (let key in this.editForm) {
      // if (this.prepareFields.includes(key)) {
        this.form[key] = this.editForm[key];
      // }
    }
    this.id = this.editForm["id"];
    // }
  },
  computed: {
    contractId() {
      return Number(this.$route.params.id);
    },
  },
    methods: {
    changeField(field, value) {
      if (this.form[field].name) {
        this.form[field].name = value;
      } else {
        this.form[field] = value;
      }
    },
    async updatePosition() {
      await this.$store.dispatch(`contracts/updateContractWork`, {
        id: this.id,
        form: this.form,
        contract: this.contractId,
      });
      this.$emit("close-and-update");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-agreement {
  width: 1108px;
  padding: 29px 69px 20px 65px;
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
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__block {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__line {
    display: flex;
    margin: 0px -17px 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__col {
    width: calc(100% / 3 - 34px);
    margin: 0 17px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 40px;
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
