<template>
  <section>
    <div class="table-item">
      <div class="table-item__content">
        <Tabs v-if="tabs.length" :tabs="tabs" isTableTabs />

        <div class="table-item__main">
          <div class="table-item__header" v-if="title">
            <div class="table-item__title">
              {{ tableTitle }}
            </div>
            <div class="table-item__actions">
              <slot name="titlePanel"></slot>
            </div>
          </div>

          <Loader v-if="!(preparedData && preparedColumns)" />
          <table class="table-item__table" v-else>
            <tr>
              <td>
                <div class="table-item__scroll">
                  <table>
                    <thead>
                      <tr
                        class="table-item__table-tr table-item__table-tr--head"
                      >
                        <td
                          @click="sortBy(column)"
                          v-for="(column, key) in [...preparedColumns]"
                          :key="key"
                          class="table-item__table-td table-item__table-td--checked"
                          :class="[
                            hideServerFields.some(
                              (field) => field === [...preparedColumns][key]
                            )
                              ? `hide_id_cell`
                              : `table_cell--${[...preparedColumns][key]}`,
                          ]"
                        >
                          <template v-if="column === 'checked'">
                            <Checkbox isButton v-model="checkAll" />
                          </template>

                          <template v-else-if="column === 'options'">
                            <IconSwitch name="dots" color="#90A0B7" isButton />
                          </template>
                          <template v-else-if="getSubModule">
                            {{
                              vocabulary[getModuleName][getSubModule][column]
                            }}
                          </template>
                          <template v-else>
                            {{ column }}
                          </template>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(row, rowKey) in preparedData"
                        :key="rowKey"
                        class="table-item__table-tr contracts__list-item"
                        :class="[
                          {
                            showStatusLabel: showStatusLabel,
                          },
                          showStatusLabel
                            ? `contracts__list-item--${row.status.name.substring(
                                0,
                                2
                              )}`
                            : '',
                        ]"
                      >
                        <td
                          v-for="(keyByColumns, columnIndex) in [
                            ...preparedColumns,
                          ]"
                          :key="columnIndex"
                          class="table-item__table-td"
                          :class="[
                            hideServerFields.some(
                              (field) =>
                                field === [...preparedColumns][columnIndex]
                            )
                              ? `hide_id_cell`
                              : `table_cell--${
                                  [...preparedColumns][columnIndex]
                                }`,
                          ]"
                        >
                          <template
                            v-if="
                              Object.keys(preparedData[rowKey])[columnIndex] ===
                              'checked'
                            "
                          >
                            <Checkbox v-model="checkedRows[row.id]" />
                          </template>
                          <template
                            v-else-if="
                              Object.keys(preparedData[rowKey]).some(
                                (key) => key === 'options'
                              ) &&
                              columnIndex + 1 === [...preparedColumns].length
                            "
                          >
                            <div class="dots dots__container">
                              <div @click="openSubMenu(row.id)">
                                <IconSwitch
                                  name="dots"
                                  color="#90A0B7"
                                  isButton
                                />
                              </div>
                              <div
                                v-click-outside="hideSubMenu"
                                v-if="activeSubMenu === row.id"
                                class="dots__submenu"
                              >
                                <div
                                  v-for="(menuItem, menuItemKey) in menuItems"
                                  :key="menuItemKey"
                                  @click="initMenuAction(menuItem.action, row)"
                                  class="dots__submenu__item"
                                >
                                  {{ menuItem.name }}
                                </div>
                              </div>
                            </div>
                          </template>
                          <template
                            v-else-if="
                              keyByColumns === 'data.number' &&
                              row.data.table.includes('number')
                            "
                          >
                            {{ row.data.number }}
                          </template>
                          <template v-else-if="keyByColumns.includes('.')">
                            <div>
                              {{ getDeepValue(row, keyByColumns) }}
                            </div>
                          </template>
                          <template
                            v-else-if="typeof row[keyByColumns] === 'object'"
                          >
                            <template
                              v-if="row[keyByColumns] && row[keyByColumns].name"
                            >
                              {{ row[keyByColumns].name }}
                            </template>
                            <template v-else>
                              <div
                                v-for="(subArrayEl, subArrayElKey) in row[
                                  keyByColumns
                                ]"
                                :key="subArrayElKey"
                              >
                                <template v-if="typeof subArrayEl === 'object'">
                                  <template v-if="subArrayEl.name">
                                    <div>
                                      {{ subArrayEl.name }}
                                    </div>
                                  </template>
                                  <template v-else>
                                    <div
                                      v-for="(
                                        subsubArrayEl, subsubArrayElKey
                                      ) in subArrayEl"
                                      :key="subsubArrayElKey"
                                    >
                                      {{ subsubArrayEl }}
                                    </div>
                                  </template>
                                </template>
                              </div>
                            </template>
                          </template>
                          <template v-else>
                            {{ row[keyByColumns] }}
                          </template>
                        </td>
                      </tr>
                      <template v-if="false">
                        <!-- v-for в этот template, v-if props который говорит что это история корректировок, по умолчанию false -->
                        <tr
                          class="table-item__table-tr contracts__list-item"
                          :class="[
                            { showStatusLabel: showStatusLabel },
                            showStatusLabel
                              ? `contracts__list-item--${row.status.name.substring(
                                  0,
                                  2
                                )}`
                              : '',
                          ]"
                        >
                          <!-- тут повторяющаяся строка самих данных -->
                        </tr>
                        <tr>
                          <!-- тут коррекция -->
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <Paginator
          :pages-count="data.length"
          @change-table-state="$emit('change-table-state', $event)"
          :total="total"
        />
      </div>
    </div>
  </section>
</template>

<script>
import IconSwitch from "@/components/simple/IconSwitch";
import Paginator from "@/components/common/Paginator";
import Checkbox from "@/components/ui/Checkbox";
import Tabs from "@/components/common/Tabs";
import vocabulary from "@/utils/vocabulary";
import ClickOutside from "vue-click-outside";

function toAddCheckedField(dataArray) {
  return dataArray.map((dataObj) => {
    return {
      checked: false,
      ...dataObj,
    };
  });
}

function toAddOptionsField(dataArray) {
  return dataArray.map((dataObj) => {
    return {
      ...dataObj,
      options: true,
    };
  });
}

function toAddCheckedAndOptionsField(dataArray) {
  return dataArray.map((dataObj) => {
    return {
      checked: false,
      ...dataObj,
      options: true,
    };
  });
}

function checkedDataWitchDataField(dataArray) {
  return [...dataArray].map((dataObj) => {
    if (dataObj.data) {
      for (let key in dataObj.data) {
        if (dataObj[dataObj.data[key]]) {
          continue;
        } else {
          dataObj[dataObj.data[key]] = dataObj.data[key];
        }
      }
      return dataObj;
    }
    return dataObj;
  });
}

// function transformDataFromDeepFields (data) {
//   return [...data].forEach
// }

export default {
  name: "Table",
  components: {
    IconSwitch,
    Paginator,
    Checkbox,
    Tabs,
  },
  data: () => ({
    checkAll: false,
    checkedRows: {},
    vocabulary: vocabulary,
    limit: 25,
    activeSubMenu: null,
  }),
  watch: {
    checkAll(newVal) {
      if (newVal) {
        this.data.forEach((item) => {
          this.$set(this.checkedRows, item.id, true);
        });
      } else {
        this.checkedRows = {};
      }
    },
    checkedRows: {
      handler(checkedRowsObj) {
        const selectedRowsArr = Object.keys(checkedRowsObj).filter(
          (chekedKey) => {
            return !!checkedRowsObj[chekedKey];
          }
        );
        const selectedRowsArrNumbers = selectedRowsArr.map(
          (selectedRowIdString) => +selectedRowIdString
        );
        this.$emit("select-rows", selectedRowsArrNumbers);
      },
      deep: true,
    },
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    title: {
      type: Boolean,
      default: true,
    },
    tableTitle: {
      type: String,
      default: "Данные",
    },
    columns: {
      type: [Array, Object],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    commonDots: {
      type: Boolean,
      default: false,
    },
    commonCheckbox: {
      type: Boolean,
      default: false,
    },
    rowDots: {
      type: Boolean,
      default: false,
    },
    rowCheckbox: {
      type: Boolean,
      default: false,
    },
    hideServerFields: {
      type: Array,
      default: () => [],
    },
    menuItems: {
      type: Array,
      default: () => [],
    },
    showStatusLabel: {
      type: Boolean,
      default: false,
    },
    extendedRow: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    preparedData() {
      // const checkedDataWitchDataFieldResult = checkedDataWitchDataField(
      //   this.data
      // );

      const checkedDataWitchDataFieldResult = this.data;
      if (this.rowCheckbox && this.rowDots) {
        return toAddCheckedAndOptionsField(checkedDataWitchDataFieldResult);
      } else if (this.rowCheckbox) {
        return toAddCheckedField(checkedDataWitchDataFieldResult);
      } else if (this.rowDots) {
        return toAddOptionsField(checkedDataWitchDataFieldResult);
      } else {
        return checkedDataWitchDataFieldResult;
      }
    },
    preparedColumns() {
      let preparingColumns;
      if (!Array.isArray(this.columns)) {
        preparingColumns = Object.keys(this.columns);
      } else {
        preparingColumns = this.columns;
      }
      if (this.commonCheckbox) {
        preparingColumns = ["checked", ...preparingColumns];
      }
      if (this.commonDots) {
        preparingColumns = [...preparingColumns, "options"];
      }
      return preparingColumns;
    },
    getModuleName() {
      return this.$route.meta.MODULE;
    },
    getSubModule() {
      return this.$route.meta.SUBMODULE;
    },
  },
  methods: {
    getDeepValue(row, keyByColumns) {
      const path = keyByColumns.split(".");
      if (path.length === 2) {
        return row[path[0]]?.[path[1]] ?? "";
      } else if (path.length === 3) {
        return row[path[0]]?.[path[1]]?.[path[2]] ?? "";
      }
    },
    initMenuAction(action, row) {
      this.activeSubMenu = null;
      this.$emit(action, row);
    },
    openSubMenu(id) {
      this.activeSubMenu = id;
    },
    hideSubMenu() {
      this.activeSubMenu = null;
    },
    sortBy(field) {
      this.$emit("change-table-sort", field);
    },
  },
  mounted() {
    this.popupItem = this.$el;
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped>
.contracts__list-item {
  td:first-child {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 12px;
    }
  }
  &--За {
    td:first-child:before {
      background: $green;
    }
  }
  &--На {
    td:first-child:before {
      background: $yellow;
    }
  }
  &--Пр {
    td:first-child:before {
      background: $purple;
    }
  }
  &--Ут {
    td:first-child:before {
      background: $purple;
    }
  }
}
.table-item {
  display: flex;
  flex-direction: column;

  .hide_id_cell {
    display: none;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__tabs {
    display: flex;
    align-items: center;
    padding-left: 22px;
    margin: 0px -10px;
  }
  &__tab {
    cursor: pointer;
    background: #f0f0f0;
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 168px;
    height: 42px;
    font-size: 13px;
    line-height: 15px;
    font-weight: 500;
    color: $gray;
    letter-spacing: 0.01em;
    margin: 0px 10px;
    &.active {
      background: $white;
      color: $accent-blue;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    background: $white;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px 20px 63px;
    box-shadow: 0px 1px 0px #ebeff2;
    border-radius: 4px;
  }
  &__title {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.01em;
    color: $table-black;
  }
  &__actions {
    display: flex;
    align-items: center;
    grid-gap: 10px;
    margin: 0px -10px 0 0;
  }
  &__action {
    width: 24px;
    height: 24px;
    margin: 0px 10px;
  }
  &__download {
    width: 191px;
    margin: 0px 10px;
  }

  &__scroll {
    scrollbar-width: thin;
    scrollbar-color: #a5acb1 #e3e8ec;
    overflow: auto;
    height: 640px;
    &::-webkit-scrollbar {
      width: 3px;
      border-radius: 6px;
    }
    &::-webkit-scrollbar-track {
      background: #e3e8ec;
      border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #a5acb1;
    }
    table {
      width: 100%;
      tr {
        box-shadow: 0px 1px 0px #ebeff2;
      }
    }
  }
  &__table {
    width: 100%;
    &-tr {
      font-size: 13px;
      line-height: 15px;
      letter-spacing: 0.01em;
      color: $table-gray;
      transition: background 0.3s;
      &:hover {
        background: #f2f9ff;
      }
      &--head {
        font-weight: 500;
        color: $table-black;

        position: sticky;
        top: 0;
        z-index: 9;
        background: #fff;
      }
      td {
        padding: 22px 15px;
        &:first-child {
          padding-left: 23px;
        }
        &:last-child {
          padding-right: 6px;
        }
      }

      .table_cell {
        &--commonDots {
          width: 60px;
        }
        &--commonCheckbox {
          width: 55px;
        }
      }

      .dots {
        &__submenu__item {
          padding: 13px 24px;
          &:hover {
            background: #f2f2f2;
          }
        }
        &__container {
          position: relative;
          cursor: pointer;
        }
        &__submenu {
          position: absolute;
          right: 41px;
          top: 0;
          box-shadow: 0px 6px 12px 0px #00000029;
          background: #fff;
          border-radius: 5px;
        }
      }
    }
    &-td {
      &--type,
      &--view {
        width: 15%;
      }
      &--btn {
        width: 37px;
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }
  &__count {
    display: flex;
    align-items: center;
    color: $table-gray;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.01em;
    span {
      color: $accent-blue;
    }
  }
  &__views {
    display: flex;
    align-items: center;
  }
  &__more {
    width: 160px;
    margin-right: 20px;
  }
  &__pagination {
    display: flex;
    align-items: center;
    span {
      cursor: pointer;
      width: 54px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $white;
      border: 1px solid #d3d8dd;
      color: $table-black;
      font-size: 13px;
      line-height: 15px;
      font-weight: 500;
      letter-spacing: 0.01em;
      &:first-child {
        border-radius: 4px 0 0 4px;
      }
      &:last-child {
        border-radius: 0 4px 4px 0;
      }
      &.active {
        background: #f7f7f7;
      }
    }
  }
}
</style>
