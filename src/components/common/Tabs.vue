<template>
  <div class="tabs" :class="{ 'tabs--table': isTableTabs }">
    <router-link
      v-for="(tab, key) in tabs"
      :key="key + $route.name"
      :to="{ name: tab.routerLinkName }"
      tag="div"
      class="tabs__tab"
    >
      <BaseButton 
        :text="tab.text" 
        destiny="tab" 
        routerLinkChild 
        :icon="tab.icon"
        :route-name="tab.routerLinkName "
      />
    </router-link>
  </div>
</template>
<script>
import BaseButton from '@/components/simple/BaseButton'

export default {
  name: "Tabs",
  components: {
    BaseButton,
  },
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    isTableTabs: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
  .tabs {
    display: flex;
    grid-gap: 20px;
    align-items: center;

  }
  .tabs:not(.tabs--table) {
    margin-bottom: 40px;
  }
</style>
