<template>
  <section>
    <ReportsStatistics />
    <div class="report">
      <form class="report__create">
        <h2 class="title title_h2 report__create__title">Создать отчёт</h2>
        <div class="report__create__display">
          <h3 class="title title_h3 report__create__subtitle">
            Выбор отображения
          </h3>
          <b-form-group
            v-slot="{ ariaDescribedby }"
            class="report__create__radios"
          >
            <b-form-radio-group
              v-model="selected"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="plain-inline"
              plain
            ></b-form-radio-group>
          </b-form-group>
        </div>
        <div class="report__create__conditions">
          <h3 class="title title_h3 report__create__subtitle">
            Условия выборки
          </h3>
          <div class="report__create__inputs" v-for="(item, index) in conditions" :key="index">
            <div class="report__create__input">
              <Select 
                label="Выбор сущности"
                class="inpt__input--default"
              />
            </div>
            <div class="report__create__input">
              <Select 
                label="Выбор атрибута сущности"
                class="inpt__input--default"
              />
            </div>
            <div class="report__create__input">
              <Select 
                label="Выбор оператора"
                class="inpt__input--default"
              />
            </div>
            <div class="report__create__input">
              <Select 
                label="Выбор значения"
                class="inpt__input--default"
              />
            </div>
          </div>
          <button class="report__create__add" @click.prevent="conditions.push(1)">+ Добавить условие</button>
        </div>
        <div class="report__create__grouping">
          <h3 class="title title_h3 report__create__subtitle">
            Условия группировки
          </h3>
          <div class="report__create__inputs" v-for="(item, index) in grouping" :key="index">
            <div class="report__create__input">
              <Select 
                label="Выбор сущности"
                class="inpt__input--default"
              />
            </div>
            <div class="report__create__input">
              <Select 
                label="Выбор атрибута сущности"
                class="inpt__input--default"
              />
            </div>
            <div class="report__create__input">
              <Select 
                label="Выбор оператора"
                class="inpt__input--default"
              />
            </div>
          </div>
          <button class="report__create__add" @click.prevent="grouping.push(1)">+ Добавить условие</button>
        </div>
        <div class="report__create__buttons">
          <BaseButton
            text="Отменить"
            class="report__create__button"
            :width="152"
            view="-tertiary"
          />
          <BaseButton
            text="Добавить отчёт"
            class="report__create__button"
            :width="152"
          />
        </div>
      </form>
    </div>
  </section>
</template>

<script>
  import ReportsStatistics from '../components/ReportsStatistics';
  import BaseButton from '@/components/simple/BaseButton';
  import Select from '@/components/ui/Select'
  export default {
    components: { BaseButton, Select, ReportsStatistics },
    data() {
      return {
        selected: 'table',
        options: [
          { text: 'Таблица', value: 'table' },
          { text: 'График №1', value: 'graph-1' },
          { text: 'График №2', value: 'graph-2' },
          { text: 'График №3', value: 'graph-3' },
          { text: 'График №4', value: 'graph-4' },
          { text: 'График №5', value: 'graph-5' },
          { text: 'График №6', value: 'graph-6' },
          { text: 'График №7', value: 'graph-7' },
          { text: 'График №8', value: 'graph-8' },
        ],
        conditions: [1],
        grouping: [1]
      };
    },
  };
</script>

<style lang="scss" scoped>
  .report {
    &__create {
      max-width: 1108px;
      background: $white;
      border-radius: 4px;
      padding: 30px 70px 18px 65px;
      &__title {
        margin-bottom: 40px;
      }
      &__radios {
        margin-top: 30px;
        margin-bottom: 20px;
      }
      &__conditions {
        margin-bottom: 30px;
      }
      &__inputs {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
      }
      &__input {
        width: 280px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 40px;
        margin-right: 34px;
      }
      &__add {
        font-size: 0.8125rem;
        font-weight: 500;
        letter-spacing: 1%;
        color: $accent-blue;
      }
      &__buttons {
        display: flex;
        justify-content: flex-end;
      }
      &__button {
        width: 152px;
        margin-left: 10px;
      }
      &__cancel {
        background: $white;
        border: 1px solid $menu-gray;
        border-radius: 4px;
        width: 160px;
        color: $menu-gray;
        font-size: 0.8125rem;
        font-weight: 400;
        cursor: pointer;
      }
    }
  }
</style>

<style lang="scss">
  .form-check-label {
    & span {
      font-size: 13px;
      font-weight: 400;
      color: $table-black;
    }
  }
  .form-check-input {
    &:checked {
      &[type='radio'] {
        background-image: none;
        background-color: $accent-blue;
        border: 2px solid $accent-blue;
        box-shadow: none;
      }
    }
  }
</style>
