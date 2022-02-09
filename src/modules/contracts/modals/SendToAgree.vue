<template>
  <modal-layout
    @close="$emit('close-agree-modal')"
  >
    <div class="send-agree">
      <div class="send-agree__title">
        Отправить на согласование?
      </div>
      <div class="send-agree__text">
        Перечень работ
      </div>

      <div class="send-agree__btns">
        <v-btn
          @click="$emit('close-agree-modal')"
          label="Отменить"
          class="btn--cancel btn--normal send-agree__btn"
        />
        <v-btn
          @click="submit"
          label="Отправить"
          class="btn--primary btn--normal send-agree__btn"
        />
      </div>
    </div>
  </modal-layout>
</template>

<script>
  import ModalLayout from '@/components/common/ModalLayout'

  export default {
    name: 'SendToAgree',
    components: {
      ModalLayout
    },
    data () {
      return {
        form: {
          payment: '',
          amount: '',
          number: '',
          date: '',
        },
      }
    },
    methods: {
      submit () {
        this.$emit('send-approve');
        this.$emit('close-agree-modal');
      },

    }
  }
</script>

<style lang="scss" scoped>
  .send-agree {
    width: 532px;
    padding: 29px 20px 20px;
    background: $white;
    display: flex;
    flex-direction: column;
    font-weight: 500;
    letter-spacing: 0.01em;
    text-align: center;

    &__title {
      font-size: 20px;
      line-height: 23px;
      color: $table-black;
      margin-bottom: 6px;
    }

    &__text {
      font-size: 13px;
      line-height: 15px;
      color: $table-gray;
    }

    &__btns {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 29px -6px 0;
    }

    &__btn {
      margin: 0px 6px;
      width: 160px;
    }
  }
</style>
