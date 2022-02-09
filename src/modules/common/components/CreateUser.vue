<template>
  <layout @close="$emit('close')">
    <form class="admin__create">
      <h2 class="title title_h2 admin__title admin__title_tablet">
        Создать пользователя
      </h2>
      <a href class="admin__upload">
        <img src="@/assets/icons/upload.svg" alt="загрузить" />
        <p>Загрузить изображение</p>
      </a>
      <div class="admin__content">
        <h2 class="title title_h2 admin__title">Создать пользователя</h2>
        <div class="admin__inputs">
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
        </div>
        <div class="admin__buttons">
          <button class="admin__cancel" @click="$emit('close')">
            Отменить
          </button>
          <router-link to="/user-access">
            <button class="admin__submit">Создать</button>
          </router-link>
        </div>
      </div>
      <img
        src="@/assets/icons/close.svg"
        alt="закрыть"
        class="admin__close"
        @click="$emit('close')"
      />
    </form>
  </layout>
</template>

<script>
  import BaseButton from '@/components/simple/BaseButton';
  import Input from '@/components/ui/Input';
  import Layout from './Layout';

  export default {
    components: { BaseButton, Input, Layout },
    data() {
      return {
        inputsFields: [
          {
            id: 'name',
            label: 'Имя',
            type: 'text',
            value: '',
            holder: '',
            disabled: false,
          },
          {
            id: 'surname',
            label: 'Фамилия',
            type: 'text',
            value: '',
            holder: '',
            disabled: false,
          },
          {
            id: 'second name',
            label: 'Отчество',
            type: 'text',
            value: '',
            holder: '',
            disabled: false,
          },
          {
            id: 'email',
            label: 'Email',
            type: 'email',
            value: '',
            holder: '',
            disabled: false,
          },
          {
            id: 'role',
            label: 'Статус',
            type: 'text',
            value: '',
            holder: '',
            disabled: false,
          },
          {
            id: 'phone',
            label: 'Телефон',
            type: 'tel',
            value: '',
            holder: '',
            disabled: false,
          },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  .admin {
    &__title {
      &_tablet {
        display: none;
      }
    }
    &__create {
      display: flex;
      align-items: flex-start;
      position: fixed;
      top: 164px;
      right: 50%;
      transform: translateX(62%);
      width: 1108px;
      background: #ffffff;
      box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      padding: 30px 65px 20px 65px;
    }
    &__content {
      flex-basis: 67%;
    }
    &__edit {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px 34px;
      margin-top: 30px;
    }
    &__upload {
      width: 282px;
      height: 260px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #f0f0f0;
      font-size: 0.8125rem;
      font-weight: 400;
      letter-spacing: 1%;
      color: $table-gray;
      text-decoration: none;
      margin-right: 58px;
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
      background: $accent-blue;
      padding: 10px;
      border-radius: 4px;
      color: $white;
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
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
      &__create {
        width: 712px;
        flex-direction: column;
        align-items: center;
        top: 154px;
        transform: translateX(50%);
        padding: 40px;
      }
      &__content {
        flex-basis: auto;
        width: 100%;
      }
      &__upload {
        width: 100%;
        margin-right: 0;
        margin-top: 30px;
      }
    }
  }
</style>
