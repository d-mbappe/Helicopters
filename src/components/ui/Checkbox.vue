<template>
  <div class="chckbox">
    <label
      :for="id"
      class="chckbox__label"
    >
      <input
        :id="id"
        :value="value"
        :checked="Array.isArray(this.modelValue) ? isChecked : !!modelValue"
        @change="updateInput"
        :class="[classEl, 'chckbox__input']"
        type="checkbox"
      >

      <span class="chckbox__box" />

      <span
        v-if="text"
        class="chckbox__text"
      >
        {{ text }}
      </span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'Checkbox',
    model: {
      prop: 'modelValue',
      event: 'change'
    },
    props: {
      id: {
        type: String,
        required: false
      },
      value: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      modelValue: {
        default: ''
      },
      trueValue: {
        default: true
      },
      falseValue: {
        default: false
      },
      classEl: {
        type: String,
        default: ''
      }
    },
    computed: {
      isChecked () {
        if (Array.isArray(this.modelValue)) {
          return this.modelValue.includes(this.value)
        }
      }
    },
    methods: {
      updateInput (e) {
        const isChecked = e.target.checked

        if (Array.isArray(this.modelValue)) {
          let value = [...this.modelValue]

          if (isChecked) {
            value.push(this.value)
          } else {
            value.splice(value.indexOf(this.value), 1)
          }

          this.$emit('change', value)
        } else {
          this.$emit('change', isChecked)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chckbox {
    position: relative;

    &__label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    &__input {
      display: none;
      &:checked + .chckbox {
        &__box {
          background: $accent-blue url('../../assets/svg/checked.svg')no-repeat 50%;
          border-color: $accent-blue;
        }
      }
    }

    &__box {
      border: 2px solid #D5D5D5;
      background: $white;
      border-radius: 4px;
      width: 16px;
      height: 16px;
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
