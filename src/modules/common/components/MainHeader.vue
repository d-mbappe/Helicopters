<template>
  <div class="header">
    <div class="header__title_with_pagination__wrapper">
      <BreadCrumbs/>
    </div>
    <div class="header__icons">
      <div class="header__notification">
        <IconSwitch name="notification" color="" />
      </div>
      <div class="header__menu">
        <IconSwitch name="menu-burger" color="" />
      </div>
    </div>
  </div>
</template>

<script>
  import IconSwitch from '@/components/simple/IconSwitch.vue';
  import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue'
  export default {
    components: { 
      IconSwitch, 
      BreadCrumbs 
    },
  };
</script>

<style lang="scss">
  .header {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 21px 38px;
    color: $table-gray;
    &__title_with_pagination__wrapper {
      display: flex;
      grid-gap: 10px;
    }
    background: $white;
    border-bottom: 1px solid #ebeff2;
    &__icons {
      display: flex;
      align-items: center;
    }
    &__menu {
      display: none;
      cursor: pointer;
      margin-left: 23px;
    }
  }
  @media screen and (max-width: 1024px) {
    .header {
      &__menu {
        display: block;
      }
    }
  }
</style>
