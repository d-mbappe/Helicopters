<template>
  <div id="app" :class="{ mini: miniSidebar }">
    <MainHeader />
    <TheSidebar
      @squeeze-sidebar="squeezeSidebarHandler"
      :miniSidebar="miniSidebar"
    />
    <router-view class="workspace" />
    <AuthorizationForm v-if="!isUserAuthorized" />
  </div>
</template>

<script>

  import MainHeader from './modules/common/components/MainHeader.vue';
  import TheSidebar from './modules/common/components/TheSidebar.vue';
  import AuthorizationForm from './modules/common/components/AuthorizationForm';
  export default {
    components: { MainHeader, TheSidebar, AuthorizationForm },
    data() {
      return {
        isUserAuthorized: true,
        miniSidebar: false,
        hide: false,
      };
    },
    methods: {
      squeezeSidebarHandler() {
        this.miniSidebar = !this.miniSidebar;
      },
    },
  };
</script>

<style lang="scss">
  @import 'assets/css/reset';
  @import 'assets/css/global';
  #app {
    font-family: 'Roboto', sans-serif;
    smoothing: antialiased;
    font-smoothing: grayscale;

    margin-left: 256px;
    transition: $transition;

    &.mini {
      margin-left: 64px;
      transition: $transition;
    }
  }

  .workspace {
    padding: 30px 40px;
    background: $base-bg;
  }
</style>
