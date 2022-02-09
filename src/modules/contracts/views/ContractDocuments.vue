<template>
  <section>
    <div class="contract-documents">
      <div class="contract-documents__header">
        <div class="contract-documents__title">
          Таблица Сопроводительные документы
        </div>

        <div class="contract-documents__btns">
          <div class="contract-documents__actions">
            <div class="contract-documents__action">
              <img src="@/assets/icons/search.svg">
            </div>
            <div class="contract-documents__action">
              <img src="@/assets/icons/excel.svg">
            </div>
            <div
              @click="modalFilter = true"
              class="contract-documents__action"
            >
              <img src="@/assets/icons/filter.svg">
            </div>
          </div>

          <v-btn
            @click="modalUpload = true"
            label="Загрузить документ"
            class="btn--primary btn--normal btn--center contract-documents__btn contract-documents__btn--upload"
          />
        </div>
      </div>

      <div class="contract-documents__body">
        <div class="contract-documents__item contract-documents__item--header">
          <div class="contract-documents__value contract-documents__value--check">
            <v-check />
          </div>
          <div class="contract-documents__value contract-documents__value--number">
            Номер п/п
          </div>
          <div class="contract-documents__value">
            Наименование
          </div>
          <div class="contract-documents__value contract-documents__value--date">
            Номер
          </div>
          <div class="contract-documents__value contract-documents__value--date">
            Дата
          </div>
          <div class="contract-documents__value contract-documents__value--receiver">
            Получатель
          </div>
          <div class="contract-documents__value contract-documents__value--executor">
            Исполнитель
          </div>
          <div class="contract-documents__value contract-documents__value--original">
            Наличие оригинала
          </div>
        </div>
        <div class="contract-documents__scroll">
          <div
            v-for="(item, i) in list"
            :key="i"
            class="contract-documents__item"
          >
            <div class="contract-documents__value contract-documents__value--check">
              <v-check />
            </div>
            <div class="contract-documents__value contract-documents__value--number">
              {{ item.num }}
            </div>
            <div class="contract-documents__value">
              {{ item.title }}
            </div>
            <div class="contract-documents__value contract-documents__value--date">
              {{ item.number }}
            </div>
            <div class="contract-documents__value contract-documents__value--date">
              {{ item.date }}
            </div>
            <div class="contract-documents__value contract-documents__value--receiver">
              {{ item.receiver }}
            </div>
            <div class="contract-documents__value contract-documents__value--executor">
              {{ item.executor }}
            </div>
            <div class="contract-documents__value contract-documents__value--original">
              <div
                :class="{'contract-documents__original--success' : item.original}"
                class="contract-documents__original"
              >
                {{ item.original ? 'да' : 'нет' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="contract-documents__footer">
        <div class="contract-documents__show">
          Показать по:
        </div>

        <div class="contract-documents__paginations">
          <v-btn
            label="Показать еще"
            class="btn--primary btn--normal contract-documents__btn"
          />
          <div class="contract-documents__pagination">
            <span
              v-for="i in 4"
              :key="i"
              :class="{'active' : i === 1}"
            >
              {{ i }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <add-document
      v-if="modalUpload"
      @close="modalUpload = false"
    />
    <modal-filter
      v-if="modalFilter"
      @close="modalFilter = false"
    />
  </section>
</template>

<script>
  export default {
    name: 'PageContractDocuments',
    components: {
      AddDocument: () => import('../modals/AddDocument'),
      ModalFilter: () => import('../modals/ModalFilter'),
    },
    data () {
      return {
        modalUpload: false, // попап загрузки документа
        modalFilter: false, // попап фильтра
        list: [
          {
            num: 1,
            title: 'Заключение ВП МО РФ',
            number: '№960/1154',
            date: '03.10.2019',
            receiver: 'УАвБ (2 разряда, раб. пос. Соколовый)',
            executor: 'ФГУП «САП»',
            original: true
          },
          {
            num: 2,
            title: 'Протокол цены',
            number: '№3/2020/ЖЦ',
            date: '-',
            receiver: 'УАвБ (2 разряда, раб. пос. Соколовый)',
            executor: 'ФГУП «САП»',
            original: false
          },
          {
            num: 3,
            title: 'Технический Акт',
            number: '№960/1154',
            date: '03.10.2019',
            receiver: 'УАвБ (2 разряда, раб. пос. Соколовый)',
            executor: 'ФГУП «САП»',
            original: false
          },
          {
            num: 4,
            title: 'Заключение ВП МО РФ',
            number: '№960/1154',
            date: '03.10.2019',
            receiver: 'УАвБ (2 разряда, раб. пос. Соколовый)',
            executor: 'ФГУП «САП»',
            original: true
          },
          {
            num: 5,
            title: 'Протокол цены',
            number: '№3/2020/ЖЦ',
            date: '-',
            receiver: 'УАвБ (2 разряда, раб. пос. Соколовый)',
            executor: 'ФГУП «САП»',
            original: false
          },
          {
            num: 6,
            title: 'Технический Акт',
            number: '№960/1154',
            date: '03.10.2019',
            receiver: 'УАвБ (2 разряда, раб. пос. Соколовый)',
            executor: 'ФГУП «САП»',
            original: false
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contract-documents {
    display: flex;
    flex-direction: column;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: $white;
      border-radius: 4px;
      padding: 20px 24px 20px 63px;
      box-shadow: 0px 1px 0px #EBEFF2;
      margin-bottom: 1px;
    }

    &__title {
      font-size: 18px;
      line-height: 21px;
      font-weight: 500;
      letter-spacing: 0.01em;
      color: $table-black;
    }

    &__btns {
      display: flex;
      align-items: center;
    }

    &__actions {
      display: flex;
      align-items: center;
      margin: 0px 10px 0 -10px;
    }

    &__action {
      cursor: pointer;
      margin: 0px 10px;
    }

    &__btn {
      width: 160px;
      &--upload {
        width: 194px;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
    }

    &__scroll {
      width: calc(100% + 3px);
      display: flex;
      flex-direction: column;
      height: 225px;
      overflow: auto;
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

    &__item {
      display: flex;
      align-items: center;
      background: $white;
      padding: 22px 0;
      box-shadow: 0px 1px 0px #EBEFF2;
      margin-bottom: 1px;
      &:last-child {
        margin-bottom: 0;
      }
      &--header {
        .contract-documents__value {
          color: $table-black;
          font-weight: 500;
          letter-spacing: 0.01em;
        }
      }
    }

    &__value {
      font-size: 13px;
      line-height: 15px;
      color: $table-gray;
      display: flex;
      align-items: flex-start;
      width: calc(100% / 6);
      flex: 1 1 auto;
      padding: 0px 8px;
      &:first-child {
        padding-left: 22px;
      }
      &:last-child {
        padding-right: 6px;
      }
      &--check {
        flex: 0 0 auto;
        width: 46px;
      }
      &--number {
        flex: 0 0 auto;
        width: 80px;
      }
      &--date {
        flex: 0 0 auto;
        width: 130px;
      }
      &--receiver {
        flex: 0 0 auto;
        width: 230px;
      }
      &--executor {
        flex: 0 0 auto;
        width: 160px;
      }
      &--original {
        flex: 0 0 auto;
        width: 100px;
      }
      // width: 250px;
      // padding: 0px 10px;
      // font-size: 13px;
      // line-height: 15px;
      // letter-spacing: 0.01em;
      // color: $table-gray;
    }

    &__original {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 18px;
      padding: 0px 15px;
      color: $white;
      background: $red;
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.01em;
      border-radius: 4px;
      &--success {
        background: $green;
      }
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
    }

    &__show {
      font-size: 12px;
      line-height: 14px;
      color: $table-gray;
    }

    &__paginations {
      display: flex;
      align-items: center;
    }

    &__pagination {
      display: flex;
      align-items: center;
      margin-left: 20px;
      span {
        cursor: pointer;
        font-size: 13px;
        line-height: 15px;
        font-weight: 500;
        letter-spacing: 0.01em;
        width: 54px;
        height: 42px;
        border: 1px solid #D3D8DD;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $white;
        &.active {
          background: #F7F7F7;
        }
        &:first-child {
          border-radius: 4px 0 0 4px;
        }
        &:last-child {
          border-radius: 0 4px 4px 0;
        }
      }
    }
  }
</style>
