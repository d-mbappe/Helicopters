<template>
  <modal-layout
    @close="$emit('close')"
  >
    <div class="add-document">
      <div class="add-document__top">
        <div class="add-document__title">
          Загрузить документ
        </div>
      </div>

      <div class="add-document__form">
        <div class="add-document__line">
          <div class="add-document__col">
            <v-input
              label="Наименование"
              v-model="form.title"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-document__col">
            <v-input
              label="Номер"
              v-model="form.number"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-document__col">
            <v-input
              label="Дата документа"
              v-model="form.date"
              class-el="inpt__input--default"
            />
          </div>
        </div>

        <div class="add-document__line">
          <div class="add-document__col">
            <v-input
              label="Исполнитель"
              v-model="form.executor"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-document__col">
            <v-input
              label="Получатель"
              v-model="form.receiver"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-document__col">
            <v-input
              label="Наличие оригинала"
              v-model="form.original"
              class-el="inpt__input--default"
            />
          </div>
        </div>
      </div>

      <div class="add-document__footer">
        <div class="add-document__file">
          <label
            for="upload"
            class="add-document__upload"
          >
            <input
              id="upload"
              type="file"
              @change="upload"
            >
            <img src="@/assets/svg/plus-circle.svg">
            Загрузить документ
          </label>

          <div
            v-if="form.file"
            class="add-document__preview"
          >
            <img src="@/assets/svg/document.svg">
            <span>
              {{ form.file.name }}
            </span>
          </div>
        </div>

        <div class="add-document__btns">
          <v-btn
            label="Отменить"
            class="btn--cancel btn--normal add-document__btn add-document__btn--cancel"
          />
          <v-btn
            label="Сохранить"
            class="btn--primary btn--normal add-document__btn add-document__btn--save"
          />
        </div>
      </div>
    </div>
  </modal-layout>
</template>

<script>
  import ModalLayout from '@/components/common/ModalLayout'

  export default {
    name: 'AddDocument',
    components: {
      ModalLayout
    },
    data () {
      return {
        form: {
          title: '',
          number: '',
          date: '',
          executor: '',
          receiver: '',
          original: '',
          file: null
        }
      }
    },
    methods: {
      upload (e) {
        const file = e.target.files[0];
        this.form.file = file;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .add-document {
    width: 1108px;
    padding: 29px 69px 20px 65px;
    background: $white;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
    }

    &__title {
      font-size: 18px;
      line-height: 21px;
      font-weight: 500;
      color: $table-black;
      letter-spacing: 0.01em;
    }

    &__form {
      display: flex;
      flex-direction: column;
    }

    &__line {
      display: flex;
      align-items: center;
      margin: 0px -17px 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    &__col {
      width: calc(100% / 2 - 34px);
      margin: 0 17px;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 40px;
    }

    &__file {
      display: flex;
      align-items: center;
      font-size: 13px;
      line-height: 15px;
      letter-spacing: 0.01em;
      color: $accent-blue;
    }

    &__upload {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-weight: 500;
      input {
        display: none;
      }
      img {
        margin-right: 2px;
      }
    }

    &__preview {
      display: flex;
      align-items: center;
      margin-left: 27px;
      img {
        margin-right: 2px;
      }
      span {
        text-decoration: underline;
        max-width: 180px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    &__btns {
      display: flex;
      align-items: center;
      margin: 0px -5px;
    }
    &__btn {
      margin: 0px 5px;
      &--cancel {
        width: 140px;
      }
      &--save {
        width: 152px;
      }
    }
  }
</style>
