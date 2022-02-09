<template>
  <div class="radio">
    <label
      :for="id"
      class="radio__label"
    >
      <input
        :id="id"
        :value="value"
        :name="name"
        :checked="typeof modelValue === 'boolean' ? !!modelValue : (value === modelValue)"
        @change="$emit('change', (typeof modelValue === 'boolean') ? $event.target.checked : $event.target.value)"
        :class="[classEl, 'radio__input']"
        type="radio"
      >

      <span class="radio__box" />

      <span
        v-if="text"
        class="radio__text"
      >
        {{ text }}
      </span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'Radio',
    model: {
      prop: 'modelValue',
      event: 'change'
    },
    props: {
      id: {
        type: String,
        required: true
      },
      value: {
        type: [Boolean, String],
        default: ''
      },
      modelValue: {
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      classEl: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .radio {
    position: relative;

    &__label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    &__input {
      display: none;
      &:checked + .radio {
        &__box {
          border-color: $accent-blue;
          position: relative;
          &:before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $accent-blue;
          }
        }
      }
    }

    &__box {
      border: 2px solid #D5D5D5;
      background: $white;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: block;
      flex: 0 0 auto;
      background-repeat: no-repeat;
      background-position: 50%;
      transition: all .3s;
    }

    &__text {
      color: $table-black;
      font-size: 13px;
      line-height: 15px;
      font-weight: 500;
      margin-left: 10px;
    }
  }
</style>
