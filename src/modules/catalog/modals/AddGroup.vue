<template>
  <modal-layout
    @close="$emit('close')"
  >
    <div class="add-group">
      <div class="add-group__title">
        Добавить группу
      </div>

      <div class="add-group__form">
        <div class="add-group__line">
          <div class="add-group__col">
            <Select 
              label="Вид работ"
              v-model="form.id"
              title="name"
              class="inpt__input--default add__select"
              :options="formData.workTypes"
              id="workTypes"
            />
          </div>
          <div class="add-group__col" />
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
          Добавить поле Контрольная точка
        </div>

        <div class="add-group__btns">
          <BaseButton text="Отменить"
                      class="add-group__btn add-group__cancel"
                      @click="$emit('close')"
          />
          <BaseButton text="Добавить"
                      class="add-group__btn add-group__add"
                      @click="editForm ? updatePosition() : addPosition()"
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
  import vocabulary from '@/utils/vocabulary';

  export default {
    name: 'AddGroup',
    components: {
      ModalLayout,
      BaseButton,
      Select
    },
    props: {
      fields: {
        type: Array,
        required: true,
      },
      editForm: {
        type: Object,
        default: false,
      },
      hideServerFields: {
        type: Array,
        default: false,
      },
    },
    data () {
      return {
        form: {
          points: [
            { name: '', description: '' },
            { name: '', description: '' },
            { name: '', description: '' },
          ]
        },
        vocabulary: vocabulary,
        id: null,
        formData: {},
      }
    },
    mounted() {
      // if (this.editForm) {
      //   for (let key in this.editForm) {
      //     if (this.prepareFields.includes(key)) {
      //       this.$set(this.form, key, this.editForm[key]);
      //     }
      //   }
      //   this.id = this.editForm['id'];
      // } else {
      //   this.prepareFields.forEach((prepareField) => {
      //     this.$set(this.form, prepareField, '');
      //   });
      // }
      this.getForm();
    },
    computed: {
      confirmText() {
        return this.editForm ? 'Изменить' : 'Добавить';
      },
      prepareFields() {
        try {
          return this.fields.filter((field) => {
            return !this.hideServerFields.includes(field);
          });
        } catch (e) {
          console.log(e);
        }
      },
      localDataName() {
        //записываем meta в переменную
        return this.$route.meta.localDataName;
      },
      getModuleName() {
        return this.$route.meta.MODULE;
      },
      getSubModule() {
        return this.$route.meta.SUBMODULE;
      },
    },
    methods: {
      changeField(field, value) {
        if (this.form[field]?.name) {
          this.form[field].name = value;
        } else {
          this.form[field] = value;
        }
      },
      async getForm() {
        if (this.localDataName === 'controlPoints') {
          const {
            data: { workTypes },
          } = await this.$store.dispatch(`catalog/form_${this.localDataName}`);
          this.$set(this.formData, 'workTypes', workTypes);
        }
      },
      async addPosition() {
        const prepareFormBeforeSubmit = {};
        for (let key in this.form) {
          if (this.form[key].id) {
            prepareFormBeforeSubmit[key] = this.form[key].id;
          } else {
            prepareFormBeforeSubmit[key] = this.form[key];
          }
        }

        await this.$store.dispatch(`catalog/add_${this.localDataName}`, {
          form: prepareFormBeforeSubmit,
        });
        this.$emit('close-and-update');
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
       addPoint () {
        this.form.points.push({
          name: '', description: ''
        })
      }
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
  .add__select{
    margin-bottom: 10px;
  }
</style>
