<template>
  <div class="reports__manage">
    <div class="reports__manage__filter">
      <span>Отчёты: </span>
      <b-form-select
        v-model="selected"
        :options="options"
        size="sm"
        class="mt-3 reports__manage__dropdown"
      ></b-form-select>
    </div>
    <div class="reports__add">
      <div @click="$emit('showShedule')">
        <IconSwitch name="time-clock" color="" class="reports__add__icon" />
      </div>
      <BaseButton
        :width="158"
        text="Добавить отчёт"
        icon="time-plus"
        class="reports__add-button"
        @click="$emit('showCreate')"
      />
    </div>
  </div>
</template>

<script>
  import IconSwitch from '@/components/simple/IconSwitch.vue';
  import BaseButton from '@/components/simple/BaseButton.vue';
  export default {
    components: { IconSwitch, BaseButton },
    data() {
      return {
        selected: 'all',
        options: [
          { value: 'all', text: 'Все' },
          { value: 'option-2', text: 'Вариант' },
          { value: 'option-1', text: 'Вариант' },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  .reports {
    &__manage {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
    }
    &__add {
      display: flex;
      align-items: center;
      &__icon {
        display: flex;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;
        &::after {
          content: '';
          width: 1px;
          height: 24px;
          background: $icon-gray;
          margin-left: 10px;
        }
      }
      &-button {
        width: 158px;
      }
    }
  }
</style>

<style lang="scss">
  .reports {
    &__manage {
      &__filter {
        font-size: 0.75rem;
        font-weight: 400;
        letter-spacing: 1%;
        color: $table-gray;
      }
      &__dropdown {
        border: none;
        background: transparent;
        outline: transparent;
        font-size: 0.75rem;
        font-weight: 400;
        letter-spacing: 1%;
        color: $accent-blue;
        & option {
          color: $table-black;
        }
      }
    }
  }
</style>
