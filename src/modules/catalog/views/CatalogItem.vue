<template>
  <section>
    <div class="catalog-item">
      <div class="catalog-item__top">
        <router-link to="/catalog" class="catalog-item__back">
          Вернуться назад
        </router-link>

        <BaseButton
          @click="isModal = true"
          text="Добавить позицию"
          class="catalog-item__add"
        />
      </div>

      <div class="catalog-item__content">
        <div class="catalog-item__tabs">
          <div @click="agreed = true"
            :class="{ active: agreed === true }"
            class="catalog-item__tab"
          >
            Согласованный
          </div>
          <div
            @click="agreed = false"
            :class="{ active: agreed === false }"
            class="catalog-item__tab"
          >
            На согласовании
          </div>
        </div>
      </div>
    </div>
    <!-- пример -->
    <Table
      v-if="getLocalDataByName && getLocalDataByName.data && columns"
      :data="getLocalDataByName.data"
      :total="getLocalDataByName.total"
      :columns="columns"
      @change-table-state="changeTableState"
      @edit-item="editItem"
      @show-history="showHistory"
      :menu-items="menuItems"
      :tableTitle="tableTitle"
      commonDots
      commonCheckbox
      rowCheckbox
      rowDots
    >
      <template #titlePanel>
        <div class="searchInput">
          <v-input
              v-if="searchInput"
              label="Поиск"
              v-model="searchQuery"
              class-el="searchInput inpt__input--default"
              id="quantity"
              @input="search"
          />
        </div>
        <div
            @click="searchInput = !searchInput"
        >
          <IconSwitch
              name="search"
              color="#90A0B7"
              :isButton="true"
              class="icon"
          />
        </div>

        <IconSwitch
          name="excel"
          color="#90A0B7"
          :isButton="true"
          class="icon"
        />
        <div v-if="filterable" @click="isFilterActive = true">
          <IconSwitch
            name="filter"
            color="#90A0B7"
            :isButton="true"
            class="icon"
          />
        </div>
        <IconSwitch name="eye" color="#90A0B7" :isButton="true" class="icon" />
        <BaseButton :text="'Загрузить из файла'" />
      </template>
    </Table>
    <add-position
      v-if="isModal"
      @close="closeModal"
      @close-and-update="updateAndCloseModal"
      :fields="formFields"
      :editForm="editForm"
    />
    <ModalFilter
        v-if="isFilterActive"

        :fields="formFields"
        :editForm="editForm"

        @close-filter-modal="isFilterActive = false"
        @filter-save="filterItems($event)"
        @filter="filterUpdate"
    />
  </section>
</template>

<script>
  import IconSwitch from '@/components/simple/IconSwitch';
  import BaseButton from '@/components/simple/BaseButton';
  import Table from '@/components/common/Table';
  import ModalFilter from "../../contracts/modals/ModalFilter";

  export default {
    name: 'CatalogItem',
    components: {
      IconSwitch,
      BaseButton,
      Table,
      ModalFilter,
      AddPosition: () => import('../modals/AddPosition'),
    },
    data: () => ({
      searchInput: false,
      searchQuery: null,
      isFilterActive: false,
      isModal: false,
      checkAll: false,
      page: 1,
      limit: 25,
      agreed: true,
      sort_by: null,
      sort: null, //desc | asc
      editId: null,
      editForm: null,
      menuItems: [
        { name: 'Редактировать', action: 'edit-item' },
        { name: 'Согласовать', action: 'approve' },
        { name: 'На доработку', action: 'revision' },
        { name: 'История изменений', action: 'show-history' },
      ],
    }),
    watch: {
      agreed() {
        this.fetchLocalDataByName();
      }
    },
    computed: {
      getFilters() {
        return this.config[this.getModuleName][this.getSubModule].filters;
      },

      filterData() {
        return {

        }
      },
      computedConfig() {
        return this.$config;
      },
      localDataName() {
        //записываем meta в переменную
        return this.$route.meta.localDataName;
      },
      getTypeName() {
        return this.$route.meta.TYPE;
      },
      getLocalDataByName() {
        // чекаем данные по переменной
        return this.$store.getters[`catalog/${this.localDataName}`];
      },
      // getFilteredLocalData() { // костыль убираем [object Object] и ключ с номером. todo: Откуда они???
      //   return [...this.getLocalDataByName.data].map(item => {
      //     return Object.fromEntries(Object.entries(item).filter(i => {
      //       console.log(i)
      //       return i[0].toString() !== '[object Object]'
      //     }))
      //   })
      // },
      columns() {
        return this.$config.catalog[this.localDataName].tableColumns
      },
      formFields() {
        return this.$config.catalog[this.localDataName].formFields
      },
      filterable() {
        return this.$config.catalog[this.localDataName].filterable
      },
      tableTitle() {
        return this.$route.meta.tableTitle;
      }
    },
    mounted() {
      if (!this.getLocalDataByName) {
        this.fetchLocalDataByName();
      }
    },
    methods: {
      search(val) {
        this.$store.dispatch(`catalog/${this.localDataName}`, {
          page: this.page,
          limit: this.limit,
          q: val,
          agreed: this.agreed,
          sort_by: this.sortBy,
          sort: this.sortField, //desc | asc
        });
      },
      editItem(formData) {
        this.editForm = formData;
        this.isModal = true;
      },
      closeModal() {
        this.editForm = null;
        this.isModal = false;
      },
      updateAndCloseModal() {
        this.closeModal();
        this.fetchLocalDataByName();
      },
      fetchLocalDataByName() {
        // создайм метод вызывающий экшн
        this.$store.dispatch(`catalog/${this.localDataName}`, {
          page: this.page,
          limit: this.limit,
          agreed: this.agreed,
          sort_by: this.sortBy,
          sort: this.sortField, //desc | asc
        });
      },
      changeTableState({ page, limit }) {
        this.page = page;
        this.limit = limit;
        this.fetchLocalDataByName();
      },
      showHistory(row) {
        this.$router.push({
          name: 'history',
          params: {
            id: row.id,
            type: this.getTypeName,
            parent: this.$route.name,
          }
        });
      },
      filterItems(filter) {
        this.$store.dispatch(`catalog/${this.localDataName}`, {
          page: this.page,
          limit: this.limit,
          agreed: this.agreed,
          sort_by: this.sortBy,
          sort: this.sortField, //desc | asc

          filter: filter
        });
      },
      filterUpdate(val) {
        this.$store.dispatch(`catalog/recipient`, {
          page: this.page,
          limit: this.limit,
          q: val
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .catalog-item {
    display: flex;
    flex-direction: column;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    &__back {
      color: $accent-blue;
      font-size: 13px;
      line-height: 15px;
      font-weight: 500;
      letter-spacing: 0.01em;
      text-decoration: none;
    }
    &__add {
      width: 160px;
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
      margin: 0px -10px;
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
      overflow: auto;
      height: 300px;
      table {
        width: 100%;
        tr {
          box-shadow: 0px 1px 0px #ebeff2;
        }
      }
    }
    &__table {
      &-tr {
        font-size: 13px;
        line-height: 15px;
        letter-spacing: 0.01em;
        color: $table-gray;
        &--head {
          font-weight: 500;
          color: $table-black;
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
      }
      &-td {
        &--checked {
          width: 54px;
        }
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
  .icon {
    margin-left: 15px;
  }
</style>
