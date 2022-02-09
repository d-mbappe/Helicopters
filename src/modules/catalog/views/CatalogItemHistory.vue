<template>
  <section>
    <div class="catalog-history">
      <div class="catalog-history__top">
        <router-link
          to="/catalog/name"
          class="catalog-history__back"
        >
          Вернуться назад
        </router-link>
      </div>

      <div class="catalog-history__list">
        <div class="catalog-history__item"
             v-if="revision"
             v-for="( revision, key ) in revisions"
             :key="key">
          <div class="catalog-history__btn">
            <img src="@/assets/icons/dots.svg">
          </div>
          <div class="catalog-history__avatar">
            <img src="@/assets/img/test-user.png">
          </div>
          <div class="catalog-history__info">
            <div class="catalog-history__name">
              {{revision.user.surname}} {{revision.user.name}} {{revision.user.patronymic}}
            </div>
            <div class="catalog-history__date">
              внесены изменения от {{ revision.created && moment(revision.created.date, 'YYYY-MM-DD').format('DD.MM.YYYY') }}
            </div>
            <div class="catalog-history__text">
              {{revision.name}}
            </div>
            <div class="catalog-history__prev" v-if="revision.prevItem">
              <div class="catalog-history__last">
                <span />
                Предыущая редакция
              </div>
              <div class="catalog-history__block">
                <div class="catalog-history__block-title">
                  {{ revision.prevItem.name }}
                </div>
                <div class="catalog-history__block-text">
                  внесено в справочник {{revision.user.surname}} {{revision.user.name}} {{revision.user.patronymic}}
                  {{ moment(revision.prevItem.created.date, 'YYYY-MM-DD').format('DD.MM.YYYY') }}
                  <br>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import moment from 'moment';
  export default {
    name: 'CatalogItemHistory',

    data: () => ({
      moment: moment,
      revisions: [],
    }),

    mounted() {
     this.getRevisions()
    },

    computed: {
      ...mapGetters("catalog", {
        currentRevision: "currentRevision"
      }),
    },
    methods: {
    ...mapActions("catalog", {
        workNameRevisions: "workNameRevisions",
      }),

      async getRevisions() {
        await this.workNameRevisions({
          id: this.$route.params.id,
          type: this.$route.params.type
        });
        const {data: {revisions: revisions}}  = this.currentRevision;

        this.revisions = revisions.map(
          (revision, index, sourceRevisions) => {
            if ( index !== sourceRevisions.length - 1 ) {
              return {
                ...revision,
                prevItem: sourceRevisions[index + 1]
              }
            }
            else {
              return revision;
            }
          }
        );
      }
    }
  }
</script>

<style lang="scss" scoped>
  .catalog-history {
    display: flex;
    flex-direction: column;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 33px;
    }

    &__back {
      color: $accent-blue;
      font-size: 13px;
      line-height: 15px;
      font-weight: 500;
      letter-spacing: 0.01em;
      text-decoration: none;
    }

    &__list {
      display: flex;
      flex-direction: column;
    }

    &__item {
      position: relative;
      display: flex;
      align-items: flex-start;
      padding: 25px 25px 20px 25px;
      background: $white;
      box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      margin-bottom: 26px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    &__btn {
      position: absolute;
      top: 25px;
      right: 25px;
      width: 16px;
      height: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__avatar {
      flex: 0 0 auto;
      margin-right: 7px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__info {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      font-size: 13px;
      line-height: 15px;
      letter-spacing: 0.01em;
    }

    &__name {
      color: $table-black;
      margin-bottom: 4px;
    }

    &__date {
      color: #A5ACB1;
      margin-bottom: 14px;
    }

    &__text {
      color: $table-gray;
      margin-bottom: 20px;
    }

    &__last {
      display: flex;
      align-items: center;
      color: $gray;
      margin-bottom: 6px;
      span {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid $yellow;
        margin-right: 7px;
      }
    }

    &__block {
      border: 1px solid $icon-gray;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      padding: 12px;
      &-title {
        color: $table-gray;
        margin-bottom: 14px;
      }
      &-text {
        font-size: 10px;
        line-height: 12px;
        color: #A5ACB1;
      }
    }
  }
</style>
