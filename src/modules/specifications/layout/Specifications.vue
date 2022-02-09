<template>
  <div>
    <Tabs
      :tabs="tabs"
    />
    <router-view/>
  </div>
</template>

<script>
  import Tabs from '@/components/common/Tabs'

  export default {
    name: 'SpecificationsLayout',
    components: {
      Tabs
    },
    data: () => ({
      tabs: [
        {
          text: 'Спецификация',
          routerLinkName: 'gk',
          icon: 'print'
        },
                {
          text: 'Акт с получателем',
          routerLinkName: 'cards',
          icon: 'blank',
        },
        {
          text: 'Генеральное извещение',
          routerLinkName: 'general-notice-cards',
          icon: 'flag',
        },
        {
          text: 'Сводный акт',
          routerLinkName: 'acts',
          icon: 'reestr',
        },
      ]
    }),
  };
</script>