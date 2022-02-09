<template>
  <div class="svg-icon" :class="{ btn : isButton }" ref="name"></div>
</template>

<script>
  export default {
    name: 'IconSwitch',

    props: {
      name: {
        type: String,
        required: true,
      },

      color: {
        type: String,
        required: false,
        default: '',
      },

      width: {
        type: Number,
        required: false,
        default: 20,
      },
      height: {
        type: Number,
        required: false,
        dafault: 20,
      },

      isButton: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        iconGray: '#C2CFE0',
        accentBlue: '#109CF1',

        iconColor: this.color,
      };
    },

    computed: {
      image() {
        return require('@/assets/icons/' + this.name + '.svg');
      },
    },

    methods: {
      setBackground() {
        let icon = this.$refs.name;

        /*Устанавливает иконку у элемента обертки */
        icon.style.WebkitMaskImage = `url( ${this.image}`;

        /*Устанавливает размеры у элемента обертки */
        // icon.style.WebkitMaskSize = `${this.width}px`;
        icon.style.WebkitMaskPosition = 'center';
        icon.style.width = `${this.width}px`;
        icon.style.height = `${this.height}px`;

        /*Проверяет элемент на кнопку и задает высоту*/
        icon.style.minHeight = this.isButton ? `${this.width}px` : '20px';

        /*Проверка на входной параметр color */
        icon.style.background = !this.color ? this.iconGray : this.iconColor;
      },
    },

    mounted() {
      this.color === 'accent-blue' ? (this.iconColor = this.accentBlue) : '';
      this.setBackground();
    },
  };
</script>

<style lang="scss" scoped>
  .svg-icon {
    min-width: 10px;
    min-height: 20px;
    mask-repeat: no-repeat;
    &.btn {
      cursor: pointer;
      &:hover {
        opacity: .8;
      }
    }
  }
</style>
