<template>
  <section class="user-access">
    <AdminHeader />
    <div class="user-access__return">
      <router-link to="/contacts" class="user-access__return-link">
        <IconSwitch
          name="arrow-left"
          color="#109CF1"
          width="20"
          class="user-access__return-icon"
        />
        <span>Вернуться назад</span>
      </router-link>
    </div>
    <div class="user-access__content">
      <table class="user-access__table">
        <tr>
          <td>
            <div class="user-access__scroll">
              <table>
                <tr class="user-access__table-tr user-access__table-tr--head">
                  <td class="user-access__table-td">Сущность</td>
                  <td class="user-access__table-td">Чтение</td>
                  <td class="user-access__table-td">Создать</td>
                  <td class="user-access__table-td">Изменение</td>
                  <td class="user-access__table-td">Удаление</td>
                  <td class="user-access__table-td">Экспорт</td>
                  <td class="user-access__table-td">Импорт</td>
                  <td class="user-access__table-td">Согласование</td>
                </tr>
                <tr class="user-access__table-tr user-access__table-tr--group">
                  <td class="user-access__table-td">
                    <div class="user-access__squeeze">
                      <span></span>
                    </div>
                    Реестр государственных контрактов
                  </td>
                </tr>
                <tr
                  v-for="(item, i) in registerGC"
                  :key="i"
                  class="user-access__table-tr"
                >
                  <td class="user-access__table-td user-access__table-td--name">
                    {{ item }}
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                </tr>
                <tr class="user-access__table-tr user-access__table-tr--group">
                  <td class="user-access__table-td">
                    <div class="user-access__squeeze">
                      <span></span>
                    </div>
                    Формирование перечня
                  </td>
                </tr>
                <tr
                  v-for="(item, i) in formationList"
                  :key="i"
                  class="user-access__table-tr"
                >
                  <td class="user-access__table-td user-access__table-td--name">
                    {{ item }}
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                  <td
                    class="user-access__table-td user-access__table-td--checkbox"
                  >
                    <v-check class="chckbox--no-text" />
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="user-access__buttons">
      <button class="user-access__cancel">Отменить</button>
      <BaseButton width="152" text="Сохранить" class="user-access__submit" />
    </div>
    <CreateGroup v-if="isCreateGroupVisible" @close="closeCreateGroupHandler" />
  </section>
</template>

<script>
  import AdminHeader from '../components/AdminHeader';
  import BaseButton from '@/components/simple/BaseButton';
  import CreateGroup from '../components/CreateGroup';
  import IconSwitch from '@/components/simple/IconSwitch';
  export default {
    components: { AdminHeader, BaseButton, CreateGroup, IconSwitch },
    data() {
      return {
        isCreateGroupVisible: false,
        activeTab: 'directorate',
        registerGC: [
          'Кнопка "Новый контракт"',
          'Карточка "Государственный контракт"',
          'Карточка "Перечень работ"',
          'Карточка "Кооперация"',
          'Карточка "Взаиморасчёты"',
          'Карточка "Доп. соглашения"',
          'Карточка "Спецификации"',
          'Карточка "Отчётные документы"',
          'Карточка "Ход исполнения"',
        ],
        formationList: [
          'Кнопка "Согласовать',
          'Форма "Добавить работу"',
          'Таблица формирования перечня',
        ],
      };
    },
    methods: {
      closeCreateGroupHandler() {
        this.isCreateGroupVisible = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .user {
    &-access {
      width: 100%;
      position: relative;
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
        padding: 40px 98px 40px 48px;
        table {
          width: 100%;
        }
      }
      &__table {
        width: 100%;
        background: $white;
        box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);

        &-tr {
          font-size: 13px;
          line-height: 15px;
          letter-spacing: 0.01em;
          color: $table-gray;
          &--head {
            font-weight: 500;
            color: $table-black;
            border-bottom: 1px solid #d3d8dd;
          }
          &--group {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-top: 40px;
            padding-bottom: 20px;
            margin-left: -20px;
            color: $table-black;
            font-weight: 500;
            & td {
              display: flex;
              align-items: center;
              justify-content: flex-start;
            }
          }

          td {
            padding: 5px 15px;
            &:first-child {
              padding-left: 32px;
            }
            &:last-child {
              padding-right: 6px;
            }
          }
        }
        &-td {
          &--checkbox {
            & div {
              display: flex;
              justify-content: center;
            }
          }
        }
      }
      &__return {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
        &-link {
          display: flex;
          align-items: center;
          font-size: 13px;
          font-weight: 500;
          color: $accent-blue;
          text-decoration: none;
          & span {
            margin-left: 2px;
          }
        }
      }
      &__buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }
      &__submit {
        width: 152px;
        margin-left: 10px;
      }
      &__cancel {
        width: 152px;
        background: $white;
        padding: 10px;
        border: 1px solid $menu-gray;
        border-radius: 4px;
        color: $menu-gray;
        font-size: 0.8125rem;
        font-weight: 400;
        cursor: pointer;
      }
      &__close {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
      }
      &__squeeze {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        border-radius: 4px;
        background: #c2cfe0;
        margin-right: 6px;
        cursor: pointer;
        & span {
          width: 8px;
          height: 2px;
          background: $white;
          border-radius: 4px;
        }
      }
    }
  }
</style>
