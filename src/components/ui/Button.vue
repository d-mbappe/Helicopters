<template>
  <button
    :type="type"
    :disabled="disabled"
    @click.prevent="$emit('click')"
    class="btn"

  >
    <span
      v-if="icon"
      class="btn__icon"
    />

    <span v-if="label">
      {{ label }}
    </span>
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      type: {
        type: String,
        default: 'button',
        validator: function (value) {
          return ['button', 'submit'].indexOf(value) !== -1;
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },

    }
  }
</script>

<style lang="scss" scoped>
  .btn {
    border: 0;
    padding: 0;
    background: none;
    cursor: pointer;
    transition: all .3s;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    color: $white;

    &--primary {
      background: $accent-blue;
      border-radius: 4px;
      box-shadow: 0px 4px 10px rgba(16, 156, 241, 0.24);
      &:hover {
        background: #34AFF9;
        box-shadow: 0px 8px 16px rgba(52, 175, 249, 0.2);
      }
      &:active {
        background: #098EDF;
        box-shadow: 0px 2px 6px rgba(9, 142, 223, 0.3);
      }
      &:disabled {
        background: $icon-gray;
        box-shadow: none;
      }
    }

    &--secondary {
      border: 1px solid $accent-blue;
      border-radius: 4px;
      color: $accent-blue;
      &:hover {
        border-color: #34AFF9;
        color: #34AFF9;
      }
      &:active {
        border-color: #098EDF;
        color: #098EDF;
      }
      &:disabled {
        border-color: $icon-gray;
        color: $icon-gray;
      }
    }

    &--cancel {
      border: 1px solid $menu-gray;
      border-radius: 4px;
      color: $menu-gray;
    }

    &--normal {
      height: 42px;
      font-size: 13px;
      line-height: 15px;
      font-weight: 500;
      letter-spacing: 0.01em;
    }
  }
</style>
