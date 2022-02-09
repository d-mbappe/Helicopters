<template>
  <button
    ref="base_button"
    class="base_button"
    @click="onClick"
    :class="[{'base_button--tab': destiny === 'tab'}, `base_button${view}`]"
    :disabled="isDisabled"
  >
    <IconSwitch
      v-if="icon"
      :name="icon"
      :color="iconColor"
      :isButton="true"
      class="icon"
    />
    <span>{{text}}</span>
  </button>
</template>

<script>
  import IconSwitch from "./IconSwitch";

  export default {
    name: "BaseButton",
    components: {
      IconSwitch
    },

    props: {
      icon: {
        type: String,
        default: '',
      },

      width: {
        type: String,
        default: null,
      },

      text: {
        type: String,
        default: '',
      },

      routerLinkChild: {
        type: Boolean,
        default: false,
      },
      destiny: {
        type: String,
        require: false,
      },
      view: {
        type: String,
        require: false,
        default: ''
        //-secondary, -tertiary
      },
      routeName: {
        type: String,
        require: false,
      },
      isDisabled: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      iconColor: null,
    }),

    methods: {
      onClick(e) {
        if (!this.routerLinkChild) {
          e.preventDefault();
        }
        this.$emit('click');
      },
      setWidth() {
        this.$refs.base_button.style.width = this.width + 'px';
      }
    },

    mounted() {
      if (this.width) {
        this.setWidth();
      }
    },
    created() {
      if (this.routerLinkChild) {
        this.iconColor = this.$route.name === this.routeName ? 'white' : '#109CF1';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .base_button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    color: $white;
    text-align: center;
    background: $accent-blue;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 13px;
    font-weight: 500;

    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(16, 156, 241, 0.24);

    &:disabled{
      pointer-events: none;
      opacity: 0.65;
    }

    &:hover {
      box-shadow: 0 4px 30px rgba(16, 156, 241, 0.24);
    }

    .icon {
      margin-right: 5px;
    }
    &--tab {
        cursor: pointer;
        background: #E8F1FD;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        line-height: 15px;
        color: #109CF1;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        transition: all .3s ease-in-out;
    }
    &-secondary{
      background: #E8F1FD;
      color: $accent-blue;
    }
    &-tertiary {
      background: transparent;
      color: $menu-gray;
      border: 1px solid $menu-gray;
      box-shadow: none;
      &:hover{
        box-shadow: none;
      }
    }
  }

  .router-link-exact-active {
    .base_button--tab {
      background: $accent-blue;
      color: #FFFFFF;
    }
  }
</style>
