<template>
  <div class="table-graph">
    <div class="table-graph__header">
      <h2 class="table-graph__title">
        {{name}}
      </h2>
      <div class="table-graph__settings">
        <IconSwitch 
          name="dots"
          color="#90A0B7"
          isButton
        />
      </div>
    </div>
    <table class="table-graph__table">
      <tr>
        <th>Ответственные</th>
        <th>Работы</th>
        <th>Сделано</th>
      </tr>
      <tr v-for="person in content" :key="person.id">
        <td class="table-graph__user">
          <img 
            :src="person.image === '' ?
            require(`@/assets/icons/human_white.svg`) :
            require(`@/assets/img/${person.image}.png`)" 
            :alt="person.name"
            class="table-graph__image"
            :class="{'table-graph__image_icon': person.image === ''}"
          >
          <span>{{person.name}}</span>
        </td>
        <td class="table-graph__data">
          {{person.works}}
        </td>
        <td class="table-graph__data">
          {{person.done}}
        </td>
      </tr>
    </table>
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
  .table-graph{
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
    th{
      padding: 10px 10px 10px 0;
      text-align: left;
    }
    th, td{
      width: 100%;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 1%;
    }
    &__data {
      text-align: center;
      color: #A5ACB1;
    }
    &__image {
      width: 24px;
      height: 24px;
      border-radius: 100%;
      margin-right: 10px;
      &_icon{
        padding: 4.8px;
        background: #C2CFE0;
      }
    }
  }
</style>