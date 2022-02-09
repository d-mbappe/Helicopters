<template>
  <layout @close="$emit('close')">
    <form class="admin__create">
      <h1 class="title title_h1 admin__title">Создать группу</h1>
      <h5 class="title title_h5 admin__subtitle">
        Укажите название новой группы
      </h5>
      <Input label="Название группы" type="text" class="admin__input" />
      <div class="admin__buttons">
        <button class="admin__cancel" @click="$emit('close')">Отменить</button>
        <BaseButton
          width="152"
          text="Создать"
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
    </form>
  </layout>
</template>

<script>
  import BaseButton from '@/components/simple/BaseButton';
  import Input from '@/components/ui/Input';
  import Layout from './Layout';
  export default {
    components: {
      BaseButton,
      Input,
      Layout,
    },
  };
</script>

<style lang="scss" scoped>
  .admin {
    &__create {
      width: 532px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      background: $white;
      box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      padding: 20px 100px;
    }
    &__subtitle {
      margin-top: 6px;
    }
    &__input {
      border-bottom: 1px solid #d3d8dd;
      padding-bottom: 6px;
      margin-top: 30px;
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
</style>
