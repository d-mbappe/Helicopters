<template>
  <div class="admin__header">
    <router-link to="/admin-panel">
      <button class="admin__header__button">Настройки</button>
    </router-link>
    <router-link to="/contacts">
      <button class="admin__header__button">Контакты</button>
    </router-link>
    <router-link to="/access">
      <button class="admin__header__button">Права доступа</button>
    </router-link>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .admin {
    &__header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 30px;
      &__button {
        margin-right: 10px;
        background: #e8f1fd;
        border-radius: 4px;
        padding: 15px;
        font-size: 12px;
        font-weight: 500;
        color: $accent-blue;
        text-transform: uppercase;
        transition: all 0.3s;
        &:hover {
          color: $white;
          background: $accent-blue;
        }
      }
    }
  }
  .router-link-active {
    & .admin__header__button {
      color: $white;
      background: $accent-blue;
    }
  }
</style>
