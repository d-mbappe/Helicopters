<template>
  <div>
    <Tabs :tabs="tabs"/>
    <router-view/>
  </div>
</template>
<script>
  import Tabs from '@/components/common/Tabs'
  import Config from '../config'
  export default {
    name: 'SpecificationsLayout',
    components: {
      Tabs
    },
    data: () => ({
      tabs: Config.tabsMenu
    }),
  };
</script>