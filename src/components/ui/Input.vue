<template>
  <div class="inpt">
    <label
      v-if="label"
      :for="id"
      class="inpt__label"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="holder"
      :class="[classEl, 'inpt__input']"
    >
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    holder: {
      type: String,
      default: ''
    },
    value: {
      required: false
    },
    classEl: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .inpt {
    width: 100%;
    position: relative;
    z-index: 10;

    &__label {
      font-size: 12px;
      line-height: 14px;
      color: $gray;
      letter-spacing: 0.01em;
    }

    &__input {
      width: 100%;
      background: none;
      border: none;
      transition: all .3s;

      &--default {
        border-bottom: 1px solid #D3D8DD;
        height: 30px;
        padding: 0;
        font-size: 15px;
        line-height: 18px;
        font-weight: 500;
        letter-spacing: 0.01em;
        color: $table-black;
        background: $white;
        &:focus {
          outline: 0;
        }
      }
    }
  }
</style>
