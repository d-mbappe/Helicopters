<template>
<div class="breadCrumbs">
  <div v-if="breadCrumbModule">
      {{breadCrumbModule}}&nbsp;
  </div>
  <div v-if="contractNumber">
    / № {{contractNumber}}&nbsp;
  </div>
  <div v-if="breadCrumbSubmodule">
      / {{breadCrumbSubmodule}}
  </div>
  <!-- <div v-if="breadCrumbState">
      / {{breadCrumbState}}
  </div> -->
</div>
</template>
<script>
import vocabulary from "@/utils/vocabulary";
export default {
  name: 'BreadCrumbs',
  data: () => ({
    vocabulary
  }),
  computed: {
    breadCrumbModule() {
      return vocabulary?.[this.getModuleName]?.['breadCrumb'] ?? null
    },
    breadCrumbSubmodule() {
      return vocabulary?.[this.getModuleName]?.[this.getSubModule]?.['breadCrumb'] ?? null
    },
    contractNumber() {
      return this.$route.params.number; 
    },
    // breadCrumbState() {
    //   return this.store.getters.breadCrumbState
    // },
    getModuleName() {
      return this.$route.meta.MODULE;
    },
    getSubModule() {
      return this.$route.meta.SUBMODULE;
    },
  }
}
</script>
<style>
  .breadCrumbs {
    display: flex;
    color: #707683;
    font-weight: 500;
    font-size: 13px;
  }

  .breadCrumbs > div:last-child {
    color: #A40029;
  }
</style>