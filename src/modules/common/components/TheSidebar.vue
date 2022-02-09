<template>
  <aside class="sidebar">
    <b-sidebar
      id="sidebar-no-header"
      :class="{ mini: miniSidebar }"
      visible
      no-close-on-route-change
      :width="miniSidebar ? '64px' : '256px'"
      bg-variant="white"
      aria-labelledby="sidebar-no-header-title"
      no-header
      shadow
    >
      <div class="sidebar__header" @click="$router.push({path: '/'})">
        <img
          v-if="!miniSidebar"
          class="sidebar__header__logo"
          src="@/assets/icons/main-logo.svg"
          alt="MAIN"
        />
        <img
          v-else
          class="sidebar__header__logo"
          src="@/assets/icons/main-logo_mini.svg"
          alt="MAIN"
        />
      </div>

      <div class="sidebar__content">
        <div class="sidebar__content__title">
          Мониторинг сервисных контрактов
        </div>
        <div class="sidebar__content__profile">
          <b-avatar
            size="46px"
            variant="info"
            src="https://placekitten.com/300/300"
          ></b-avatar>

          <div class="sidebar__content__profile__info">
            <div class="sidebar__content__profile__info__name">Иван Иванов</div>
            <div class="sidebar__content__profile__info__email">
              ivan-vertalet@gmail.com
            </div>
          </div>
        </div>

        <nav class="sidebar__content__nav">
          <!-- <router-link to="/common" class="sidebar__content__nav__item">
            <div class="sidebar__content__nav__item__logo">
              <IconSwitch
                name="home"
                :color="path === '/common' ? '#A40029' : ''"
              />
            </div>
            <div class="sidebar__content__nav__item__text">Рабочий стол</div>
          </router-link> -->

          <router-link to="/contracts" class="sidebar__content__nav__item">
            <div class="sidebar__content__nav__item__logo">
              <IconSwitch
                name="reestr"
                :color="path === '/contracts' ? '#A40029' : ''"
              />
            </div>
            <div class="sidebar__content__nav__item__text">Реестр ГК</div>
          </router-link>

          <template v-if="contracts">
            <router-link
              v-for="(contract, contractKey) in contracts.data"
              :key="contractKey"
              :to="{name: 'PageContractWorkList', params: { id: contract.id, number: contract.number }}"
              class="sidebar__content__nav__item--sub_item contracts"
            >
              <div class="sidebar__content__nav__item__text">
                № {{ contract.number }}
              </div>
            </router-link>
          </template>

          <router-link to="/catalog" class="sidebar__content__nav__item">
            <div class="sidebar__content__nav__item__logo">
              <IconSwitch
                name="references"
                :color="path === '/catalog' ? '#A40029' : ''"
              />
            </div>
            <div class="sidebar__content__nav__item__text">Справочники</div>
          </router-link>



          <router-link to="/specifications" class="sidebar__content__nav__item">
            <div class="sidebar__content__nav__item__logo">
              <IconSwitch
                name="human"
                :color="path === '/bpmn' ? '#A40029' : ''"
              />
            </div>
            <div class="sidebar__content__nav__item__text">Спецификации</div>
          </router-link>

          <router-link to="/report" class="sidebar__content__nav__item">
            <div class="sidebar__content__nav__item__logo">
              <IconSwitch
                name="reports"
                :color="path === '/report' ? '#A40029' : ''"
              />
            </div>
            <div class="sidebar__content__nav__item__text">Отчеты</div>
          </router-link>
          
          <router-link to="/bpmn" class="sidebar__content__nav__item">
            <div class="sidebar__content__nav__item__logo">
              <IconSwitch
                name="human"
                :color="path === '/bpmn' ? '#A40029' : ''"
              />
            </div>
            <div class="sidebar__content__nav__item__text">Управление БП</div>
          </router-link>


        </nav>
      </div>
      <template #footer="{ hide }">
        <button class="hide-btn" @click="squeezeSidebar">
          <IconSwitch
            class="hide-btn__icon"
            :class="{ rotate: miniSidebar }"
            name="arrow-left"
            color="#90A0B7"
          />
        </button>

        <router-link to="admin-panel" class="footer d-flex">
          <IconSwitch name="settings" color="" />
          <span class="settings">Настройки</span>
        </router-link>
      </template>
    </b-sidebar>
  </aside>
</template>

<script>
import IconSwitch from "@/components/simple/IconSwitch.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    IconSwitch,
  },
  props: {
    miniSidebar: {
      Boolean: false,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("contracts", {
      contracts: "contracts",
    }),
  },
  methods: {
    squeezeSidebar() {
      this.$emit("squeeze-sidebar", this.miniSidebar);
    },
    ...mapActions("contracts", {
      getContractsList: "getContractsList",
    }),
  },
  mounted() {
    if (!this.contracts) {
      this.getContractsList({
        page: 1,
        limit: 50,
      });
    }
  },
  computed: {
    ...mapGetters("contracts", {
      contracts: "contracts",
    }),
    path() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  font-size: 13px;
  color: $dark-blue-text;
  font-weight: 500;
  transition: $transition;

  & * {
    transition: $transition;
  }
  .contracts {
    margin-left: 27px;
    margin-top: 9px;
    display: block;
  }
  /*Все иконки сайдбара*/
  .icon {
    width: 17px;
    margin-right: 10px;
    opacity: 0.2;
  }

  .b-sidebar {
    /*Стили mini сайдбара*/
    &-outer.mini {
      width: 64px !important;

      .sidebar {
        &__content {
          padding: 0;

          &__title {
            opacity: 0;
            position: absolute;
          }

          &__profile {
            margin-top: 76px;

            .b-avatar {
              margin: 0 auto;
            }

            &__info {
              opacity: 0;
              position: absolute;
            }
          }

          &__nav {
            &__item {
              flex-wrap: wrap;

              &--sub_item {
                width: 100%;
                margin-left: 20px;
                color: #c2cfe0;
              }

              &__logo {
                margin: 0 auto;
              }

              &__text {
                opacity: 0;
                position: absolute;
              }
            }
          }
        }
      }

      .b-sidebar-footer {
        width: 100%;
        padding-left: 0;
        padding-right: 0;

        .svg-icon {
          margin: 0 auto;
        }

        .settings {
          opacity: 0;
          position: absolute;
        }
      }
    }
    /* end mini */

    &-footer {
      position: relative;

      height: 70px;
      border-top: 1px solid #ebeff2;
      padding: 25px;
      color: $dark-blue-text;
      & a {
        text-decoration: none;
        color: $dark-blue-text;
        &:hover {
          color: $menu-red;
        }
        &.router-link-active {
          color: $menu-red;
        }
      }
      .settings {
        margin-left: 10px;
      }
    }

    .hide-btn {
      width: 48px;
      height: 32px;
      position: absolute;
      top: -46px;
      right: 0;

      background: #f7f7f7;
      border-radius: 100px 0px 0px 100px;
      border: none;
      outline: none;

      &__icon {
        margin: auto;
        mask-size: 20px;

        &.rotate {
          transform: rotateZ(-180deg);
        }
      }
    }
  }

  &__header {
    height: 60px;
    border-bottom: 1px solid #ebeff2;
    display: flex;
    align-items: center;
    cursor: pointer;
    &__logo {
      margin: 0 auto;
    }
  }

  &__content {
    padding: 31px 24px;
    width: 100%;
    overflow: hidden;

    &__title {
      font-size: 10px;
      color: $menu-red;
      text-transform: uppercase;
      font-weight: 700;
      white-space: nowrap;
    }

    &__profile {
      display: flex;
      margin-top: 30px;
      color: $dark-blue-text;

      &__info {
        margin-left: 15px;

        &__email {
          font-size: 12px;
          opacity: 0.2;
        }
      }
    }

    &__nav {
      margin-top: 60px;
      & a {
        text-decoration: none;
        color: $dark-blue-text;
        &:hover {
          color: $menu-red;
        }
        &.router-link-active {
          color: $menu-red;
        }
      }

      &__item:first-of-type {
        margin-top: 0;
      }

      &__item {
        display: flex;
        margin-top: 25px;

        cursor: pointer;

        &__logo {
          opacity: 1;
          margin-right: 12px;

          svg path {
            fill: $icon-gray;
          }

          svg:hover path {
            fill: $menu-red;
          }
        }
      }
    }
  }
}
</style>
