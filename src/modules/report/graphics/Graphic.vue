<template>
  <div class="graphic" >
    <header class="graphic__header">
      <h2 class="graphic__title">
        {{name}}
      </h2>
      <div class="graphic__panel">
        <div class="graphic__calendar" v-if="calendar">
          <IconSwitch 
            name="calendar"
            color="#90A0B7"
            isButton
          />
        </div>
        <div class="graphic__tabs" v-if="tabs">
          <BaseButton 
            v-for="tab in tabs"
            :key="tab"
            :text="tab"
            width="89"
            class="graphic__tab"
          />
        </div>
        <div class="graphic__settings">
          <IconSwitch 
            name="dots"
            color="#90A0B7"
            isButton
          />
        </div>
      </div>
    </header>
    <div class="graphic__quotes" v-if="quotes"> 
      <p class="graphic__quotes-sum">100000 ₽</p>
      <p class="graphic__quote">
        <span>18</span>
        <IconSwitch 
            name="trending-up"
            color="#707683"        
        />
      </p>
    </div>
    <div class="graphic__years" v-if="years">
      <div class="graphic__years-arrow">
        «‎
      </div>
      <ul class="graphic__years-list">
        <li class="graphic__years-list-item" v-for="year in years" :key="year">
          {{year}}
        </li>
      </ul>
      <div class="graphic__years-arrow">
        »‎
      </div>
    </div>
    <div class="graphic__content">
      <div class="graphic__content-digits" v-if="digits">
        <p class="graphic__content-sum">
           {{digits.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} ₽
        </p>
        <p class="graphic__content-month">
          Данные за {{digits.month}}
        </p>
      </div>
      <apexchart 
        :width="width"
        :height="height"
        :series="series" 
        class="graphic__graphic"
        :type="type"
        :options="options"
      />
    </div>

  </div>
</template>

<script>
  import IconSwitch from '@/components/simple/IconSwitch';
  import BaseButton from '@/components/simple/BaseButton';
  export default {
    components: {
      IconSwitch,
      BaseButton
    },
    props: {
      name: {
        type: String,
        required: false,
        default: 'График'
      },
      calendar: {
        type: Boolean,
        required: false,
        default: false,
      },
      tabs: {
        type: Array,
        required: false,
        default: []
      },
      width: {
        type: String,
        required: false,
        default: '100%'
      },
      height: {
        type: String,
        required: false,
        default: 'auto'
      },
      type: {
        type: String,
        required: false,
        default: 'bar'
      },
      options: {
        type: Object,
        required: true
      },
      series: {
        type: Array,
        required: true
      },
      digits: {
        type: Object,
        required: false,
        default: null
      },
      quotes: {
        type: Boolean, //Неизвестно в каком виде будет приходить, поэтому пока такой тип
        required: false,
        default: false
      },
      years: {
        type: Array,
        required: false,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .graphic {
    background: $white;
    padding: 25px;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    &__header{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__title{
      font-size: 18px;
      font-weight: 500;
      letter-spacing: 0.01em;
      color: $table-black;
      margin: 0;
    }
    &__panel{
      display: flex;
      align-items: center;
    }
    &__calendar{
      padding-right: 10px;
      border-right: 1px solid #90A0B7;
      cursor: pointer;
    }
    &__tabs{
      display: flex;
      align-items: center;
    }
    &__tab{
      margin-left: 10px;
    }
    &__content{
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      &-digits{
        text-align: left;
      }
      &-sum{
        font-size: 28px;
        font-weight: 500;
        letter-spacing: 0.01em;
        color: #707683;
        margin-bottom: 60px;
      }
      &-month{
        font-size: 13px;
        font-weight: 400;
        letter-spacing: 0.01em;
        color: #707683;
      }
    }
    &__quotes{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 13px;
      &-sum{
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 0.01em;
        color: #707683;
        margin: 0;
      }
    }
    &__quote{
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.01em;
      color: #707683;
      margin: 0;
      margin-right: 10px;
    }
    &__years{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 20px;
      &-arrow{
        font-size: 16px;
        font-weight: 500;
        color: $menu-gray;
        cursor: pointer;
      }
      &-list{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 13px;
        font-weight: 500;
        color: $menu-gray;
        list-style: none;
        &-item{
          cursor: pointer;
        }
      }
    }
  }
</style>