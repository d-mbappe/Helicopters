<template>
  <div class="reports__statistics">
    <BaseButton
      :width="158"
      text="Ход исполнения"
      icon="rating"
      class="reports__statistics__progress"
    />
    <BaseButton
      :width="237"
      class="reports__statistics__efficiency"
      text="Показатели эффективности"
      view="-secondary"
    />
  </div>
</template>

<script>
  import BaseButton from '@/components/simple/BaseButton.vue';
  export default {
    components: { BaseButton },
  };
</script>

<style lang="scss" scoped>
  .reports {
    &__statistics {
      display: flex;
      padding-bottom: 20px;
      &__progress {
        margin-right: 10px;
      }
    }
  }
</style>
