<template>
  <modal-layout
    @close="$emit('close')"
  >
    <div class="add-group">
      <div class="add-group__title">
        Редактировать группу
      </div>

      <div class="add-group__form">
        <div class="add-group__line">
          <div class="add-group__col">
             <Select
              title="workType"
              class="inpt__input--default disabled"
              label="Вид работ"
              :value="selectValue"
            />
          </div>
        </div>

        <div
          v-for="(item, i) in form.points"
          :key="i"
          class="add-group__line"
        >
          <div class="add-group__col">
            <v-input
              label="Контрольная точка"
              v-model="item.name"
              class-el="inpt__input--default"
            />
          </div>
          <div class="add-group__col">
            <v-input
              label="Описание"
              v-model="item.description"
              class-el="inpt__input--default"
            />
          </div>
        </div>
      </div>

      <div class="add-group__footer">
        <div
          @click="addPoint()"
          class="add-group__point"
        >
          Добавить Контрольную точку
        </div>

        <div class="add-group__btns">
          <BaseButton text="Отменить"
                      class="add-group__btn add-group__cancel"
          />
          <BaseButton text="Добавить"
                      class="add-group__btn add-group__add"
          />
        </div>
      </div>
    </div>
  </modal-layout>
</template>

<script>
  import ModalLayout from '@/components/common/ModalLayout'
  import BaseButton from '@/components/simple/BaseButton';
  import Select from '@/components/ui/Select';
  export default {
    name: 'AddGroup',
    components: {
      ModalLayout,
      BaseButton,
      Select
    },
    props: {
      selectValue: {
        type: Object,
        required: true,
      },
      points: {
        type: Array,
        required: false
      },
    },
    data () {
      return {
        form: {
          view: '',
          points: this.points,
          vocabulary: vocabulary,
          id: null,
          formData: {},
        }
      }
    },
    methods: {
      addPoint () {
        this.form.points.push({
          title: '', desc: ''
        })
      },
      async updatePosition() {
        const prepareFormBeforeSubmit = {};
        for (let key in this.form) {
          if (this.form[key].id) {
            prepareFormBeforeSubmit[key] = this.form[key].id;
          } else {
            prepareFormBeforeSubmit[key] = this.form[key];
          }
        }

        await this.$store.dispatch(`catalog/update_${this.localDataName}`, {
          id: this.id,
          form: prepareFormBeforeSubmit,
        });
        this.$emit('close-and-update');
      },
    }
  }
</script>

<style lang="scss" scoped>
  .add-group {
    width: 772px;
    padding: 20px 65px;
    background: $white;

    &__title {
      margin-top: 9px;
      font-size: 18px;
      line-height: 15px;
      font-weight: 500;
      color: $table-black;
      letter-spacing: 0.01em;
      margin-bottom: 30px;
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

    &__point {
      cursor: pointer;
      font-size: 13px;
      line-height: 15px;
      font-weight: 500;
      letter-spacing: 0.01em;
      color: $accent-blue;
    }

    &__btns {
      display: flex;
      align-items: center;
      margin: 0px -5px;
    }
    &__btn {
      width: 152px;
      margin: 0px 5px;
    }
  }
</style>