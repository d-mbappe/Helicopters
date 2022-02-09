<template>
  <div>
    <div class="modal__overlay" />

    <div @click.self="$emit('close')" class="modal__box">
      <div @click.self="$emit('close')" class="modal__wrap">
        <div @click.self="$emit('close')" class="modal__content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModalLayout',
    mounted() {
      document.body.style.overflow = 'hidden';
    },
    beforeDestroy() {
      document.body.style.overflow = '';
    },
  };
</script>

<style lang="scss" scoped>
  .modal {
    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(50, 60, 71, 0.5);
      z-index: 2000;
    }

    &__box {
      position: fixed;
      overflow-y: auto;
      overflow-x: hidden;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      text-align: center;
      white-space: nowrap;
      z-index: 2001;
    }

    &__wrap {
      position: relative;
      height: 100%;
      &:after {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 100%;
        content: '';
      }
    }

    &__content {
      display: inline-block;
      vertical-align: middle;
      position: relative;
      white-space: normal;
      text-align: left;
      margin: 50px auto;
    }

    &__close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 24px;
      height: 24px;
      z-index: 10;
    }
  }
</style>
