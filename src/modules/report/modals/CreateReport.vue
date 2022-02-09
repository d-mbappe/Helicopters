<template>
  <modal-layout
      @close="$emit('close')"
  >
    <form class="reports__form reports__form-create">
      <div class="reports__form__titles">
        <h1 class="title title_h1 reports__form__title">Создать отчёт</h1>
        <h5 class="title title_h5 reports__form__subtitle">
          Укажите данные отчёта
        </h5>
        <div class="reports__form__inputs">
          <div class="reports__form__input">  
            <Input 
              id="report-title"
              type="text"
              label="Название" 
              classEl="inpt__input--default"
            />
          </div>
          <div class="reports__form__input">
            <Input 
              id="report-data"
              label="Дата"
              type="date"
              classEl="inpt__input--default"
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
               
        </div>
      </div>
      <div @click="$emit('close')">
        <IconSwitch
          name="close"
          color=""
          class="form__close"
        />
      </div>
    </form>
  </modal-layout>
</template>

<script>
  import IconSwitch from '@/components/simple/IconSwitch.vue';
  import BaseButton from '@/components/simple/BaseButton.vue';
  import ModalLayout from '@/components/common/ModalLayout';
  import Input from '@/components/ui/Input';
  import Select from '@/components/ui/Select';
  export default {
    components: {
      IconSwitch,
      BaseButton,
      ModalLayout,
      Input,
      Select
    }
  };
</script>

<style lang="scss" scoped>
  .reports {
    &__form {
      background: $white;
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
      &__inputs {
        width: 332px;
        margin: 30px auto 0 auto;
      }
      &__input {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 40px;
        // & label {
        //   font-size: 0.75rem;
        //   font-weight: 400;
        //   line-height: 14px;
        //   letter-spacing: 0.01em;
        //   color: $menu-gray;
        //   margin-bottom: 10px;
        // }
        // & input {
        //   border: none;
        //   outline: transparent;
        //   border-bottom: 1px solid #d3d8dd;
        // }
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
