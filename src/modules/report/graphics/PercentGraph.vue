<template>
  <div class="percent-graph">
    <div class="percent-graph__header">
      <h2 class="percent-graph__title">
        {{name}}
      </h2>
      <div class="percent-graph__settings">
        <IconSwitch 
          name="dots"
          color="#90A0B7"
          isButton
        />
      </div>
    </div>
    <div class="percent-graph__content">
      <div class="percent-graph__item" 
        v-for="item in content" 
        :key="item.name">
        <p class="percent-graph__item-name">
          {{item.name}}
        </p>
        <p class="percent-graph__item-total">
          {{item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} руб
        </p>
        <div class="percent-graph__item-full">
          <div class="percent-graph__item-part"
               :class="{
                 'percent-graph__item-part_green': item.spent / item.total * 100 > 75,
                 'percent-graph__item-part_yellow': item.spent / item.total * 100 <= 75,
                 'percent-graph__item-part_red': item.spent / item.total * 100 <= 50,
               }"
               :style="{width: item.spent / item.total * 100 + '%'}"
          ></div>
        </div>
        <p class="percent-graph__item-spent">
          {{item.spent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} руб
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import IconSwitch from '@/components/simple/IconSwitch';
export default {
  components: {
    IconSwitch
  },
  props: {
    name: {
      type: String,
      require: true
    },
    content: {
      type: Array,
      require: false,
    }
  }
}
</script>

<style lang="scss" scoped>
  .percent-graph{
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
    &__content{
      margin-top: 40px;
    }
    &__item{
      &-name{
        font-size: 13px;
        font-weight: 400;
        letter-spacing: 1%;
        color: $table-black;
        text-align: left;
        margin: 0;
      }
      &-total{
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 1%;
        color: $table-black;
        text-align: right;
        margin: 0;
      }
      &-spent{
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 1%;
        color: $table-gray;
        text-align: right;
        margin: 0;
      }
      &-full{
        width: 100%;
        height: 2px;
        background: #D3D8DD;
        border-radius: 6px;
        margin: 7px 0;
      }
      &-part{
        width: 50%;
        height: 100%;
        &_green{
          background: #2ED47A;
        }
        &_yellow{
          background: #FFB946;
        }
        &_red{
          background: #F7685B;
        }
      }
    }
  }
</style>
