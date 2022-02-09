<template>
  <div class="reports__notices">
    <div class="reports__notices__titles">
      <h1 class="title title_h1 reports__notices__title">Ваши уведомления</h1>
      <h5 class="title title_h5 reports__notices__subtitle">Сегодня</h5>
    </div>
    <div class="reports__notices__items">
      <div class="reports__notices__item">
        <IconSwitch name="reports" color="#C2CFE0" />
        <div class="reports__notices__text">
          <h5 class="title title_h5 reports__notices__subtitle">
            Отчёты
          </h5>
          <p class="reports__notices__notice">
            Сформирован Отчет №1 от 11.05.2020
          </p>
          <a href="#" class="reports__notices__link">посмотреть</a>
        </div>
        <p class="reports__notices__time">19:00</p>
      </div>
      <div class="reports__notices__item">
        <IconSwitch name="reports" color="" />
        <div class="reports__notices__text">
          <h5 class="title title_h5 reports__notices__subtitle">
            Отчёты
          </h5>
          <p class="reports__notices__notice">
            До обновления Отчета №3 осталось 30 минут
          </p>
          <a href="#" class="reports__notices__link">посмотреть</a>
        </div>
        <p class="reports__notices__time">19:00</p>
      </div>
    </div>
   <div class="close" @click="$emit('close')">
      <img src="../../../assets/icons/close.svg" alt="close">
   </div>
  </div>
</template>

<script>
  import IconSwitch from '@/components/simple/IconSwitch';
  export default {
    components: { IconSwitch },
  };
</script>

<style lang="scss" scoped>
  .reports {
    &__notices {
      width: 360px;
      background: $white;
      box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      position: absolute;
      top: 29px;
      right: 48px;
      padding: 25px;

      &__item {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 15px;
      }
      &__notice {
        font-size: 0.8125rem;
        font-weight: 500;
        color: $table-black;
        margin: 0;
      }
      &__text {
        width: 77%;
      }
      &__time {
        font-size: 0.625rem;
        font-weight: 400;
        color: #d3d8dd;
      }
      &__link {
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 15.23px;
        letter-spacing: 1%;
        text-decoration: underline;
        color: $accent-blue;
        &:hover {
          color: $accent-blue;
        }
      }
    }
  }
  .close{
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 100%;
    background: $white;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
</style>
