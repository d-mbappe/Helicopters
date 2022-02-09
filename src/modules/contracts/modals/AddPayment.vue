<template>
  <modal-layout
    @close="$emit('close')"
  >
    <div class="add-payment">
      <div class="add-payment__top">
        <div class="add-payment__title">
          Внести расчет
        </div>
      </div>

      <div class="add-payment__form">
        <div class="add-payment__line">
          <div class="add-payment__col">
            <v-input
              label="Выберите расчет"
              v-model="form.payment"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-payment__col">
            <v-input
              label="Сумма"
              v-model="form.amount"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-payment__col">
            <v-input
              label="Номер поручения"
              v-model="form.number"
              class-el="inpt__input--default"
            />
          </div>
        </div>

        <div class="add-payment__line">
          <div class="add-payment__col">
            <v-input
              label="Дата поручения"
              v-model="form.date"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-payment__col" />
          <div class="add-payment__col" />
        </div>
      </div>

      <div class="add-payment__footer">
        <div class="add-payment__btns">
          <v-btn
            label="Отменить"
            class="btn--cancel btn--normal add-payment__btn add-payment__btn--cancel"
          />
          <v-btn
            label="Сохранить"
            class="btn--primary btn--normal add-payment__btn add-payment__btn--save"
          />
        </div>
      </div>
    </div>
  </modal-layout>
</template>

<script>
  import ModalLayout from '@/components/common/ModalLayout'

  export default {
    name: 'AddPayment',
    components: {
      ModalLayout
    },
    data () {
      return {
        form: {
          payment: '',
          amount: '',
          number: '',
          date: '',
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
  .add-payment {
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

    &__form {
      display: flex;
      flex-direction: column;
    }

    &__line {
      display: flex;
      align-items: center;
      margin: 0px -17px 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    &__col {
      width: calc(100% / 2 - 34px);
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
