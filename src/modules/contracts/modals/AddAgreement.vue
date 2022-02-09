<template>
  <modal-layout
    @close="$emit('close')"
  >
    <div class="add-agreement">
      <div class="add-agreement__top">
        <div class="add-agreement__title">
          Создать доп. соглашение
        </div>
      </div>

      <div class="add-agreement__form">
        <div class="add-agreement__line">
          <div class="add-agreement__col">
            <v-input
              label="Наименование"
              v-model="form.title"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-agreement__col">
            <v-input
              label="Номер"
              v-model="form.number"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-agreement__col">
            <v-input
              label="Дата"
              v-model="form.date"
              class-el="inpt__input--default"
            />
          </div>
        </div>

        <div class="add-agreement__line">
          <div class="add-agreement__col">
            <v-input
              label="Договор"
              v-model="form.contract"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-agreement__col">
            <v-input
              label="Исполнитель"
              v-model="form.executor"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-agreement__col">
            <v-input
              label="Основание"
              v-model="form.desc"
              class-el="inpt__input--default"
            />
          </div>
        </div>
      </div>

      <div class="add-agreement__footer">
        <div class="add-agreement__file">
          <label
            for="upload"
            class="add-agreement__upload"
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
            class="add-agreement__preview"
          >
            <img src="@/assets/svg/document.svg">
            <span>
              {{ form.file.name }}
            </span>
          </div>
        </div>

        <div class="add-agreement__btns">
          <v-btn
            label="Отменить"
            class="btn--cancel btn--normal add-agreement__btn add-agreement__btn--cancel"
          />
          <v-btn
            label="Создать"
            class="btn--primary btn--normal add-agreement__btn add-agreement__btn--save"
          />
        </div>
      </div>
    </div>
  </modal-layout>
</template>

<script>
  import ModalLayout from '@/components/common/ModalLayout'

  export default {
    name: 'AddGroup',
    components: {
      ModalLayout
    },
    data () {
      return {
        form: {
          title: '',
          number: '',
          date: '',
          contract: '',
          executor: '',
          desc: '',
          file: null,
        },
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
  .add-agreement {
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

    &__block {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    &__line {
      display: flex;
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
