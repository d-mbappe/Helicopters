<template>
  <div
    class="select"
    :class="{
      'pagination-dropdown': isPaginatorSelect || isStatusesSelect,
      'statuses-dropdown': isStatusesSelect,
    }"
  >
    <label v-if="label" :for="id">
      {{ label }}
    </label>

    <vue-select
      :id="id"
      :options="workTypeGroups ? workTypeGroups : options"
      @input="updateSelect"
      @open="clearValue"
      @search="searchFilter"
      :placeholder="holder"
      :searchable="searchable"
      :label="title"
      :value="value"
      :multiple="multiple"
      :selectable="selectable"
    >
      <div slot="no-options">Нет совпадений</div>
      <template #option="{ group, name }" v-if="id==='workType'">
        <div v-if="group" class="group">
          {{ group }}
        </div>
        {{ name }}
      </template>
    </vue-select>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    id: {
      type: String,
      default: "",
    },
    options: {
      type: [Array, Object],
      default: () => [],
    },
    value: {
      type: [Number, String, Array, Object],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    holder: {
      type: String,
      default: "",
    },
    isPaginatorSelect: {
      type: Boolean,
      default: false,
    },
    isStatusesSelect: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    groupSelectable: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
  },
  computed: {
    workTypeGroups() {
      if (this.id !== "workType" || this.groupSelectable) {
        return null;
      }
      return this.options.map((workType) => {
        return {
          id: workType.id,
          number: workType.number,
          name: workType.name[0] === "-" ? workType.name : null,
          group: workType.name[0] !== "-" ? workType.name : false,
        };
      });
    },

    selectable() {
      return this.groupSelectable ? option => true : option => !option.group
    }
  },
  methods: {
    updateSelect(val) {
      this.$emit("input", val);
    },
    searchFilter(val) {
      this.$emit("search", val);
    },
    clearValue(val) {
      if (!this.searchable) return;
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss">
.vs__dropdown-option--disabled {
  background: #ededed!important;
  color: #3b3b3b!important;
  cursor: auto!important;
}
.vs__selected-options {
  display: flex;
  position: absolute;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #d8dce1;
}
.vs__dropdown-menu {
  max-height: 200px;
  overflow-y: auto;
}

.select {
  position: relative;

  &.inpt__input--default {
    label {
      font-size: 12px;
      line-height: 14px;
      color: #90a0b7;
      letter-spacing: 0.01em;
    }
  }

  .v-select {
    width: 100%;
    position: relative;
    z-index: 10;
    &.vs--open {
      z-index: 12;
    }

    .vs__dropdown-toggle {
      height: 30px;
    }

    .vs__actions {
      display: none;
    }

    .vs__search {
      box-sizing: border-box;
      width: 100%;
      background: url("../../assets/svg/select-arrow.svg") no-repeat 100% 50%;
      border: 0;
      // border-bottom: 1px solid #d3d8dd;
      height: 100%;
      padding: 0;
      box-shadow: none;
      font-size: 16px;
      line-height: 18px;
      letter-spacing: 0.01em;
      color: $table-black;
      position: absolute;
      &:focus {
        background: none;
        outline: 0;
      }
    }

    .vs__selected {
      border: none;
      // position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      padding: 0;
      height: auto;
      font-size: 15px;
      line-height: 18px;
      font-weight: 500;
      letter-spacing: 0.01em;
      color: $table-black;
      z-index: 1;
      width: inherit;
    }

    .vs__deselect {
      margin-left: 3px;
    }

    .vs__dropdown-menu {
      position: absolute;
      z-index: 11;
      background: $white;
      box-shadow: 0px 14px 41px rgba(0, 0, 0, 0.07);
      // border-radius: 25px;
      // overflow: hidden;
      width: 100%;
      min-width: 0px !important;
      top: calc(100% + 5px);
      padding: 15px 0;
      li {
        cursor: pointer;
        font-size: 14px;
        line-height: 21px;
        background: none;
        white-space: normal;
        padding: 10px 15px;
        position: relative;
        &.vs__dropdown-option--highlight {
          background: $black;
          color: $white;
        }
      }
    }
  }
}
.select.pagination-dropdown {
  display: inline-block;
  &.statuses-dropdown{
    width: 140px;

    .vs__selected {
      width: 120px;
    }
  }
  width: 40px;
  text-align: center;
  .v-select {
    margin-left: 5px;
  }
  .vs__selected-options {
    position: relative;
    border-bottom: none !important;
  }
  .vs__selected {
    font-size: 12px;
    line-height: 12px;
    font-weight: 5400;
    letter-spacing: 1%;
    color: $accent-blue;
    width: 32px;

  }
  .vs__search {
    border: none;
  }
  .vs__dropdown-menu {
    padding: 0px !important;
    li {
      font-size: 12px;
      font-weight: 400;
      color: $accent-blue;
      padding: 10px;
      &.vs__dropdown-option--highlight {
        background: $accent-blue;
        color: $white;
      }
    }
  }
}
</style>
