<template>
  <section>
    <div class="executor-details">
      <div class="executor-details__top">
        <a
          @click.prevent="$router.go(-1)"
          href="#"
          class="executor-details__back"
        >
          Вернуться назад
        </a>

        <v-btn
          @click="isModal = true"
          label="Внести расчет"
          class="btn--primary btn--normal executor-details__btn"
        />
      </div>
    </div>

    <add-payment
      v-if="isModal"
      @close="isModal = false"
    />
  </section>
</template>

<script>
  export default {
    name: 'ContractSettlesExecutorDetails',
    components: {
      AddPayment: () => import('../modals/AddPayment'),
    },
    data () {
      return {
        isModal: false,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .executor-details {
    display: flex;
    flex-direction: column;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    &__back {
      text-decoration: none;
      color: $accent-blue;
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;
      letter-spacing: 0.01em;
      display: flex;
      align-items: center;
    }

    &__btn {
      width: 160px;
    }
  }
</style>
