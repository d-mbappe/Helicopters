<template>
  <modal-layout
    @close="$emit('close')"
  >
    <form class="shedule__form shedule__form-create">
      <div class="shedule__form__titles">
        <h1 class="title title_h1 shedule__form__title">
          Расписание обновления отчётов
        </h1>
        <h5 class="title title_h5 shedule__form__subtitle">
          Настроить расписание
        </h5>
        <div class="shedule__form__inputs">
          <div class="shedule__form__point">
            <div class="shedule__form__input">
              <Input 
                id="shedule-date" 
                type="date" 
                label="Дата"
                classEl="inpt__input--default"
              />
            </div>
            <div class="shedule__form__input">
              <Input 
                id="shedule-time" 
                type="time" 
                label="Время"
                classEl="inpt__input--default"
              />
            </div>
          </div>
          <div class="shedule__form__selects">
            <Select 
              id="shedule-interval" :options="sheduleIntervals"
              label="Повторять с интервалом"
            />
            <Select 
              id="shedule-notify" :options="sheduleNotify"
              label="Уведомлять"
            />
          </div>
        </div>

        <div class="form__buttons">
          <BaseButton
            :width="160"
            text="Отменить"
            class="form__buttons__submit"
            view="-tertiary"
            @click="$emit('close')"
          />
          <BaseButton
            :width="160"
            text="Сохранить"
            class="form__buttons__submit"
          />
        </div>
      </div>
      <div @click="$emit('close')">
        <IconSwitch
        isButton
        name="close"
        color=""
        class="form__close"
      />
      </div>
    </form>
  </modal-layout>
</template>

<script>
  import ModalLayout from '@/components/common/ModalLayout';
  import IconSwitch from '@/components/simple/IconSwitch.vue';
  import BaseButton from '@/components/simple/BaseButton.vue';
  import Input from '@/components/ui/Input';
  import Select from '@/components/ui/Select';
  export default {
    components: {
      ModalLayout,
      IconSwitch,
      BaseButton,
      Select,
      Input
    },
    data() {
      return{
      sheduleIntervals: [
        'Еженедельно - Понедельник',
        'Еженедельно - Вторник',
        'Еженедельно - Среда',
        'Еженедельно - Четверг',
        'Еженедельно - Пятница',
        'Еженедельно - Суббота',
        'Еженедельно - Воскресенье',
        'Ежедневно - 10:00',
        'Ежедневно - 11:00',
        'Ежедневно - 12:00',
        'Ежедневно - 13:00',
        'Ежедневно - 14:00',
        'Ежедневно - 15:00',
        'Варианты'
      ],
      sheduleNotify: [
        'Да',
        'Нет'
      ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .shedule {
    &__form {
      background: $white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background: #ffffff;
      box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      z-index: 99;
      &-create {
        width: 532px;
      }
      &__title {
        text-align: center;
      }
      &__subtitle {
        text-align: center;
      }
      &__point {
        width: 332px;
        display: flex;
        justify-content: space-between;
        & .shedule__form__input {
          width: 45%;
        }
      }
      &__inputs {
        width: 332px;
        margin: 30px auto 40px auto;
      }
    }
  }
</style>
<style lang="scss">
  .form {
    &__buttons {
      width: 332px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      &__submit {
        width: 160px;
      }
      &__cancel {
        background: $white;
        border: 1px solid $menu-gray;
        border-radius: 4px;
        width: 160px;
        color: $menu-gray;
        font-size: 0.8125rem;
        font-weight: 400;
        cursor: pointer;
      }
    }
    &__close {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
  }
</style>
