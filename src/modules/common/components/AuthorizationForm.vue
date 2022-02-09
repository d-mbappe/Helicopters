<template>
  <div class="authorization">
    <div class="authorization__left">
      <img
        class="authorization__logo"
        src="@/assets/icons/main-logo.svg"
        alt="logo"
      />
    </div>
    <div class="authorization__right">
      <img
        class="authorization__logo authorization__logo_tablet"
        src="@/assets/icons/main-logo.svg"
        alt="logo"
      />
      <form class="authorization__form">
        <h1 class="title title_h1 authorization__title">Войти</h1>
        <Input
          id="userLogin"
          type="text"
          value="Пользователь 1"
          label="Введите логин"
          class="authorization__input"
          classEl="inpt__input--default"
        />
        <Input
          id="userPassword"
          type="password"
          value=""
          label="Введите пароль"
          class="authorization__input"
          classEl="inpt__input--default"
        />
        <BaseButton width="160" text="Войти" class="authorization__button" />
        <a href="#" class="authorization__link">Забыли пароль?</a>
      </form>
    </div>
  </div>
</template>

<script>
  import Input from '@/components/ui/Input';
  import BaseButton from '@/components/simple/BaseButton';
  export default {
    components: {
      Input,
      BaseButton,
    },
  };
</script>

<style lang="scss" scoped>
  .authorization {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $white;
    z-index: 9999;
    &__left {
      width: 58.82%;
      height: 100%;
      background: url('../../../assets/img/authorization-bg.jpg') 28% / cover
        no-repeat;
      padding: 46px 78px;
    }
    &__right {
      width: 41.18%;
      padding: 48px;
    }
    &__logo {
      &_tablet {
        display: none;
      }
    }
    &__title {
      text-align: center;
      margin-bottom: 32px;
    }
    &__form {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
    &__input {
      width: 100%;
      margin-bottom: 20px;
    }
    &__button {
      margin-top: 36px;
    }
    &__link {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: $accent-blue;
      text-decoration: none;
      margin-top: 15px;
    }
  }
  @media screen and (max-width: 1024px) {
    .authorization {
      &__left {
        display: none;
      }
      &__right {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background: url('../../../assets/img/authorization-bg.jpg') no-repeat;
        background-size: cover;
        background-position: 50% 50%;
      }
      &__logo {
        &_tablet {
          display: block;
        }
      }
      &__form {
        width: 593px;
        height: 851px;
        background: $white;
        border: 1px solid #ebeff2;
        border-radius: 4px;
        padding: 48px;
        margin-top: 80px;
      }
    }
  }
</style>
