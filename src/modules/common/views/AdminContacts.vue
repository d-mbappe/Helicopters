<template>
  <section class="admin-contacts">
    <AdminHeader />
    <div class="admin-contacts__content">
      <div class="admin-contacts__tabs">
        <div
          class="admin-contacts__tab"
          @click="activeTab = 'all'"
          :class="{ active: activeTab === 'all' }"
        >
          Все контакты
        </div>
        <div
          class="admin-contacts__tab"
          @click="activeTab = 'directorate'"
          :class="{ active: activeTab === 'directorate' }"
        >
          Дирекции ВР
        </div>
        <div
          class="admin-contacts__tab"
          @click="activeTab = 'specialists'"
          :class="{ active: activeTab === 'specialists' }"
        >
          Специалисты СЦ
        </div>
        <div
          class="admin-contacts__tab"
          @click="activeTab = 'responsible'"
          :class="{ active: activeTab === 'responsible' }"
        >
          Ответственные
        </div>
        <div
          class="admin-contacts__tab"
          @click="activeTab = 'performers'"
          :class="{ active: activeTab === 'performers' }"
        >
          Исполнители
        </div>
      </div>
      <div class="admin-contacts__main">
        <div class="admin-contacts__header">
          <div class="admin-contacts__title">Таблица контактов</div>
          <div class="admin-contacts__actions">
            <a href="#" class="admin-contacts__action">
              <IconSwitch
                name="search"
                width="24"
                class="admin-contacts__actions-icon"
                color=""
              />
            </a>
            <a href="#" class="admin-contacts__action">
              <IconSwitch
                name="excel"
                width="24"
                class="admin-contacts__actions-icon"
                color=""
              />
            </a>
            <a href="#" class="admin-contacts__action">
              <IconSwitch
                name="filter"
                width="24"
                class="admin-contacts__actions-icon"
                color=""
              />
            </a>
            <BaseButton
              icon="time-plus"
              width="210"
              text="Создать пользователя"
              class="admin-contacts__create"
              @click="isCreateUserVisible = true"
            />
          </div>
        </div>
        <table class="admin-contacts__table">
          <tr>
            <td>
              <div class="admin-contacts__scroll">
                <table>
                  <tr
                    class="admin-contacts__table-tr admin-contacts__table-tr--head"
                  >
                    <td
                      class="admin-contacts__table-td admin-contacts__table-td--checked"
                    >
                      <v-check
                        :id="`checked_all`"
                        v-model="checkAll"
                        class="chckbox--no-text"
                      />
                    </td>
                    <td
                      class="admin-contacts__table-td admin-contacts__table-td--count"
                    >
                      Номер
                    </td>
                    <td class="admin-contacts__table-td--name">Ф.И.О.</td>
                    <td
                      class="admin-contacts__table-td admin-contacts__table-td--view"
                    >
                      Email
                    </td>
                    <td
                      class="admin-contacts__table-td admin-contacts__table-td--phone"
                    >
                      Телефон
                    </td>
                    <td
                      class="admin-contacts__table-td admin-contacts__table-td--btn"
                    >
                      Статус
                      <img src="@/assets/icons/dots.svg" />
                    </td>
                  </tr>
                  <tr
                    v-for="(item, i) in contacts"
                    :key="i"
                    class="admin-contacts__table-tr"
                    v-show="
                      activeTab === 'all' || activeTab === item.filterName
                    "
                  >
                    <td
                      class="admin-contacts__table-td admin-contacts__table-td--checked"
                    >
                      <v-check
                        :id="`checked_${i}`"
                        v-model="item.checked"
                        class="chckbox--no-text"
                      />
                    </td>
                    <td
                      class="admin-contacts__table-td admin-contacts__table-td--count"
                    >
                      {{ i + 1 }}
                    </td>
                    <td
                      class="admin-contacts__table-td admin-contacts__table-td--name"
                    >
                      <div>
                        <img
                          :src="
                            item.photo
                              ? require(`@/assets/img/${item.photo}.png`)
                              : noImageIcon
                          "
                          :alt="item.name"
                        />
                      </div>
                      {{ item.name }}
                    </td>
                    <td
                      class="admin-contacts__table-td admin-contacts__table-td--view"
                    >
                      {{ item.email }}
                    </td>
                    <td
                      class="admin-contacts__table-td admin-contacts__table-td--phone"
                    >
                      {{ item.phone }}
                    </td>
                    <td
                      class="admin-contacts__table-td admin-contacts__table-td--btn"
                    >
                      <span>{{ item.position }}</span>
                      <img src="@/assets/icons/dots.svg" />
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="admin-contacts__footer">
      <div class="admin-contacts__count">
        Показать по:
        <span> 50 </span>
      </div>

      <div class="admin-contacts__views">
        <BaseButton text="Показать еще" class="admin-contacts__more" />
        <div class="admin-contacts__pagination">
          <span v-for="i in 4" :key="i" :class="{ active: i === 1 }">
            {{ i }}
          </span>
        </div>
      </div>
    </div>
    <CreateUser v-if="isCreateUserVisible" @close="closeCreateUser" />
  </section>
</template>

<script>
  import AdminHeader from '../components/AdminHeader';
  import BaseButton from '@/components/simple/BaseButton';
  import IconSwitch from '@/components/simple/IconSwitch';
  import CreateUser from '../components/CreateUser';
  import Table from '../../../components/common/Table';
  export default {
    components: { AdminHeader, BaseButton, IconSwitch, CreateUser, Table },
    data() {
      return {
        activeTab: 'all',
        checkAll: true,
        isCreateUserVisible: false,
        noImageIcon: require('@/assets/icons/user.svg'),
        contacts: [
          {
            checked: false,
            photo: 'test-user',
            name: 'Иванов Иван Иванович',
            email: 'ivan-vertalet@gmail.com',
            phone: '+7 999-545-43-43',
            position: 'Администратор',
            filterName: 'administrator',
          },
          {
            checked: false,
            photo: 'antonova',
            name: 'Антонова Елена Игоревна',
            email: 'elena-vr@gmail.com',
            phone: '+7 999-600-73-53',
            position: 'Дирекция ВП',
            filterName: 'directorate',
          },
          {
            checked: false,
            photo: '',
            name: 'Бобкова Ольга Николаевна',
            email: 'bobkova-vr@gmail.com',
            phone: '+7 999-545-43-43',
            position: 'Специалисты СЦ',
            filterName: 'specialists',
          },
          {
            checked: false,
            photo: '',
            name: 'Бобров Сергей Юрьевич',
            email: 'bobrov-vr@gmail.com',
            phone: '+7 999-545-43-43',
            position: 'Ответственные',
            filterName: 'responsible',
          },
          {
            checked: false,
            photo: '',
            name: 'Леонидов Алексей Геннадьевич',
            email: 'leonidov-vr@gmail.com',
            phone: '+7 999-545-43-43',
            position: 'Исполнители',
            filterName: 'performers',
          },
          {
            checked: false,
            photo: '',
            name: 'Носик Дмитрий Михайлович',
            email: 'nosik-vr@gmail.com',
            phone: '+7 999-545-43-43',
            position: 'Гос.заказчики',
            filterName: 'customers',
          },
        ],
      };
    },
    methods: {
      closeCreateUser() {
        this.isCreateUserVisible = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .admin {
    &-contacts {
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

      &__create {
        width: 210px;
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
          transition: all 0.3s;
          &:hover {
            background: #f2f9ff;
          }
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
          &--count {
            width: 5%;
          }
          &--name {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            & div {
              min-width: 24px;
              height: 24px;
              border-radius: 100%;
              background: $icon-gray;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 8px;
            }
          }
          &--type,
          &--view {
            width: 17%;
          }
          &--phone {
            width: 20%;
          }
          &--btn {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            & img {
              cursor: pointer;
            }
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
  }
</style>
