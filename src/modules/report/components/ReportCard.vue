<template>
  <div class="report__card">
    <div class="report__card-content">
      <h2 class="title title_h2">
        {{ title }}
      </h2>
      <p class="report__card-date">от {{ date }}</p>
      <a href="#" class="report__card-link">посмотреть</a>
    </div>
    <div class="report__card-icon">
      <IconSwitch name="menu-points" color="" />
    </div>
  </div>
</template>

<script>
  import IconSwitch from '@/components/simple/IconSwitch';
  export default {
    components: { IconSwitch },
    props: {
      title: {
        type: String,
        require: true,
      },
      date: {
        type: String,
        require: true,
      },
    },
  };
</script>
<style lang="scss" scoped>
  .report {
    &__card {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      min-width: 24%;
      margin: 10px 0;
      box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      padding: 25px 12px 20px 25px;
      background: $white;
      &-date {
        font-size: 0.625rem;
        font-weight: 400;
        line-height: 11.72px;
        letter-spacing: 1%;
        color: $table-gray;
        margin: 0;
        margin-top: 5px;
        margin-bottom: 10px;
      }
      &-link {
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
      &-icon {
        cursor: pointer;
      }
    }
  }
</style>
