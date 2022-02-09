<template>
  <layout @close="$emit('close')">
    <form class="admin__user-edit">
      <h2 class="title title_h2 admin__title admin__title_tablet">
        Изменить личные данные
      </h2>
      <div class="admin__avatar">
        <img
          src="@/assets/img/test-admin.png"
          alt="admin"
          class="admin__image"
        />
        <div class="admin__avatar-icon admin__avatar-edit">
          <IconSwitch name="edit" color="#90A0B7" />
        </div>
        <div class="admin__avatar-icon admin__avatar-delete">
          <IconSwitch name="delete" color="#90A0B7" />
        </div>
      </div>
      <div class="admin__content">
        <h2 class="title title_h2 admin__title">Изменить личные данные</h2>
        <div class="admin__edit">
          <Input
            v-for="input in inputsFields"
            :key="input.id"
            :id="input.id"
            :label="input.label"
            type="text"
            :value="input.value"
            :holder="input.holder"
            class="admin__input"
            :class="input.disabled ? 'admin__input_disabled' : ''"
          />
        </div>
        <div class="admin__buttons">
          <button class="admin__cancel" @click="$emit('close')">
            Отменить
          </button>
          <BaseButton
            width="152"
            text="Изменить"
            class="admin__submit"
            @click="$emit('close')"
          />
        </div>
        <img
          src="@/assets/icons/close.svg"
          alt="закрыть"
          class="admin__close"
          @click="$emit('close')"
        />
      </div>
    </form>
  </layout>
</template>

<script>
  import IconSwitch from '@/components/simple/IconSwitch';
  import BaseButton from '@/components/simple/BaseButton';
  import Input from '@/components/ui/Input';
  import Layout from './Layout';
  export default {
    components: { IconSwitch, BaseButton, Input, Layout },
    data() {
      return {
        inputsFields: [
          {
            id: 'name',
            label: 'Имя',
            type: 'text',
            value: 'Иван',
            holder: 'Введите имя',
            disabled: false,
          },
          {
            id: 'surname',
            label: 'Фамилия',
            type: 'text',
            value: 'Иванов',
            holder: 'Введите фамилию',
            disabled: false,
          },
          {
            id: 'second name',
            label: 'Отчество',
            type: 'text',
            value: 'Иванович',
            holder: 'Введите отчество',
            disabled: false,
          },
          {
            id: 'email',
            label: 'Email',
            type: 'email',
            value: 'ivan-vertalet@gmail.com',
            holder: 'Введите email',
            disabled: false,
          },
          {
            id: 'role',
            label: 'Статус',
            type: 'text',
            value: 'Администратор',
            holder: '',
            disabled: true,
          },
          {
            id: 'phone',
            label: 'Телефон',
            type: 'tel',
            value: '+7 999-545-43-43',
            holder: 'Введите телфон',
            disabled: false,
          },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  .admin {
    &__content {
      flex-basis: 67%;
    }
    &__title {
      &_tablet {
        display: none;
      }
    }
    &__user {
      &-edit {
        position: fixed;
        top: 164px;
        left: 50%;
        transform: translateX(-50%);
        width: 1108px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        background: $white;
        box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
        border-radius: 4px;
        padding: 30px 65px 20px 65px;
      }
    }
    &__avatar {
      position: relative;
      width: 282px;
      height: 260px;
      margin-right: 68px;
      &-icon {
        width: 28px;
        height: 28px;
        border-radius: 100%;
        padding: 6px;
        background: $white;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        position: absolute;
        top: -14px;
        cursor: pointer;
      }
      &-edit {
        right: 22px;
        padding-left: 7px;
      }
      &-delete {
        right: -14px;
        padding-left: 7px;
      }
    }
    &__image {
      aspect-ratio: 1/1;
      object-fit: cover;
    }
    &__edit {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px 34px;
      margin-top: 30px;
    }
    &__input {
      border-bottom: 1px solid #d3d8dd;
      padding-bottom: 6px;
      &_disabled {
        border-bottom: none;
      }
    }
    &__buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
    }
    &__submit {
      width: 152px;
      margin-left: 10px;
    }
    &__cancel {
      width: 152px;
      background: $white;
      padding: 10px;
      border: 1px solid $menu-gray;
      border-radius: 4px;
      color: $menu-gray;
      font-size: 0.8125rem;
      font-weight: 400;
      cursor: pointer;
    }
    &__close {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1024px) {
    .admin {
      &__title {
        display: none;
        &_tablet {
          display: block;
          align-self: flex-start;
        }
      }
      &__user {
        &-edit {
          width: 712px;
          flex-direction: column;
          align-items: center;
          top: 154px;

          padding: 40px;
        }
      }
      &__content {
        flex-basis: auto;
        width: 100%;
      }
      &__avatar {
        width: 100%;
        height: 234px;
        margin: auto;
        margin-top: 40px;
      }
      &__image {
        width: 100%;
        height: 234px;
        aspect-ratio: auto;
      }
      &__edit {
        width: 100%;
      }
    }
  }
</style>
