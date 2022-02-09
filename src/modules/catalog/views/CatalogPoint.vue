<template>
  <section>
    <div class="catalog-point">
      <div class="catalog-point__top">
        <router-link
          to="/catalog"
          class="catalog-point__back"
        >
          Вернуться назад
        </router-link>

        <BaseButton @click="isModal = true"
                    text="Добавить группу"
                    class="catalog-point__add"
        />
      </div>

      <div class="catalog-point__list">
        <div
          v-for="(item, id) in getLocalDataByName.data"
          :key="id"
          class="catalog-point__item"
        >
          <div class="catalog-point__head">
            <div class="catalog-point__title">
              {{ item.name }}
            </div>
            <div class="catalog-point__dots">
              <img src="@/assets/icons/dots.svg" @click="isUpdateModal = true">
            </div>
          </div>

          <div class="catalog-point__points">
            <div
              v-for="(point, id) in item.points"
              :key="id"
              class="catalog-point__point"
              v-show="point.data.name"
            >
              <div class="catalog-point__circle" />
              <div class="catalog-point__info">
                <div class="catalog-point__name" >
                  {{point.data.name}}
                </div>
                <div class="catalog-point__desc">
                  {{point.data.description}}
                </div>
              </div>
              <!-- <img src="@/assets/icons/dots.svg" alt="add"> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <add-group
      v-if="isModal"
      @close="isModal = false"
      @close-and-update="updateAndCloseModal"
      :editForm="editForm"
    />
    <update-points 
      v-if="isUpdateModal"
      @close="isUpdateModal = false"
      :editForm="editForm"
     
    />
  </section>
</template>

<script>
  import BaseButton from '@/components/simple/BaseButton';
  
  export default {
    name: 'CatalogPoint',
    components: {
      BaseButton,
      AddGroup: () => import('../modals/AddGroup'),
      UpdatePoints: () => import('../modals/UpdatePoints')
    },
    data () {
      return {
        isModal: false,
        isUpdateModal: false,
        editForm: null,
        list: [
          { title: 'Ремонт ВТ с модернизацией' },
          { title: 'Регулировочные и настроечные работы' },
          { title: 'Сезонное обслуживание' }
        ]
      }
    },
    computed: {
      localDataName() {
        //записываем meta в переменную
        return this.$route.meta.localDataName;
      },
      getLocalDataByName() {
        // чекаем данные по переменной
        return this.$store.getters[`catalog/${this.localDataName}`];
      },
      tableTitle() {
        return this.$route.meta.tableTitle;
      },
      isTableActive() {
        return localDataByName?.data?.length ?? false;
      },
    },
    mounted() {
      if (!this.getLocalDataByName) {
        // если нет данных в сторе вызываем экшн
        const data = this.fetchLocalDataByName({
          page: this.page,
          limit: this.limit,
        });
      }
    },
    methods: {
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
        });
      },
      changeTableState({ page, limit }) {
        this.page = page;
        this.limit = limit;

        this.fetchLocalDataByName({
          page: this.page,
          limit: this.limit,
        });
      },
    },
  }
</script>

<style lang="scss" scoped>
  .catalog-point {
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 47px;
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

    &__list {
      display: flex;
      align-items: flex-start;
      margin: 0px -10px;
    }

    &__item {
      min-width: 356px;
      background: $white;
      box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      margin: 0px 10px;
      padding: 25px;
    }

    &__head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 28px;
    }

    &__title {
      font-size: 18px;
      line-height: 21px;
      font-weight: 500;
      letter-spacing: 0.01em;
      color: $table-black;
    }

    &__points {
      height: 400px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      scrollbar-width: thin;
      scrollbar-color: #A5ACB1 #E3E8EC;
      &::-webkit-scrollbar {
        width: 3px;
        border-radius: 6px;
      }
      &::-webkit-scrollbar-track {
        background: #E3E8EC;
        border-radius: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #A5ACB1;
      }
    }

    &__point {
      display: flex;
      align-items: flex-start;
      position: relative;
      padding-bottom: 23px;
      &:before {
        content: '';
        position: absolute;
        left: 12px;
        top: 0;
        width: 1px;
        height: 100%;
        background: #D3D8DD;
      }
      &:last-child {
        &:before {
          display: none;
        }
      }
    }

    &__circle {
      flex: 0 0 auto;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #EFF4FC;
      margin-right: 17px;
      position: relative;
    }

    &__info {
      flex: 1 1 auto;
      padding-top: 5px;
      display: flex;
      flex-direction: column;
    }

    &__name {
      font-size: 13px;
      line-height: 15px;
      font-weight: 500;
      letter-spacing: 0.01em;
      color: $table-black;
      margin-bottom: 6px;
    }

    &__desc {
      font-size: 13px;
      line-height: 15px;
      letter-spacing: 0.01em;
      color: $table-gray;
    }
  }
</style>
