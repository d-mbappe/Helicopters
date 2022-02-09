<template>
  <modal-layout @close="$emit('close')">
    <div class="add-position">
      <div class="add-position__title" v-if="id">Изменить позицию</div>
      <div class="add-position__title" v-else>Добавить позицию</div>

      <div class="add-position__form" v-if="form">
        <div
          class="add-position__col"
          v-for="(field, fieldKey) in fields"
          :key="fieldKey"
        >
          <template v-if="field.type === 'select'">
            <Select
              v-if="options[field.options]"
              v-model="form[fieldKey]"
              title="name"
              class="inpt__input--default"
              :label="vocabulary[getModuleName][getSubModule][fieldKey]"
              :options="options[field.options]"
              :multiple="field['multiSelect']"
              :groupSelectable="field['groupNameSelectable']"
              :id="fieldKey"
            ></Select>
          </template>
          <template v-else-if="field.type === 'text'">
            <v-input
              :label="vocabulary[getModuleName][getSubModule][fieldKey]"
              :value="form[fieldKey] && form[fieldKey].name ? form[fieldKey].name : form[fieldKey]"
              @input="changeField(fieldKey, $event)"
              class-el="inpt__input--default"
              :id="fieldKey"
            />
          </template>
        </div>
      </div>

      <div class="add-position__footer">
        <BaseButton
          text="Отменить"
          class="add-position__btn add-position__cancel"
          @click="$emit('close')"
        />
        <BaseButton
          :text="confirmText"
          class="add-position__btn add-position__add"
          @click="editForm ? updatePosition() : addPosition()"
        />
      </div>
    </div>

  </modal-layout>
</template>

<script>
  import BaseButton from '@/components/simple/BaseButton';
  import vocabulary from '@/utils/vocabulary';
  import Select from '@/components/ui/Select';
  export default {
    name: 'FormModal',
    components: {
      BaseButton,
      Select,
    },
    data: () => ({
      form: {},
      vocabulary: vocabulary,
      id: null,
      options: {},
    }),
    props: {
      fields: {
        type: Object,
        required: true,
      },
      editForm: {
        type: Object,
        default: false,
      }
    },
    mounted() {
      if (this.editForm) {
        for (let key in this.editForm) {
          if (Object.keys(this.fields).includes(key)) {
            this.$set(this.form, key, this.editForm[key]);
          }
        }
        this.id = this.editForm['id'];
      } else {
        Object.keys(this.fields).forEach((field) => {
          this.$set(this.form, field, null);
        });
      }
      this.getFormOptions();
    },
    computed: {
      confirmText() {
        return this.editForm ? 'Изменить' : 'Добавить';
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
      async getFormOptions() {

        const needOptions = Object.values(this.fields).filter(field => {
          return field.hasOwnProperty('options')
        }).map(item => item.options)

        if (!needOptions.length) return;

        const {
          data: { workTypes, helicopters, agency, standarts },
        } = await this.$store.dispatch(`catalog/form_${this.localDataName}`);

        workTypes && this.$set(this.options, 'workTypes', workTypes);
        helicopters && this.$set(this.options, 'helicopters', helicopters);
        agency && this.$set(this.options, 'agency', agency);
        standarts && this.$set(this.options, 'standards', standarts);

        // temp
        this.localDataName === "subcontractor" && this.$set(this.options, 'workTypes', (await this.$store.dispatch(`catalog/form_workType`)).data.workTypes);
      },

      addDeepKeyToObj(obj, key, deepKey) {
        const deepObj = JSON.parse(JSON.stringify(obj))
        const path = deepKey ? deepKey.split('.') : key.split('.');
        if(path.length === 2) {
          if(!deepObj[path[0]]) {
            deepObj[path[0]] = {}
          }
          deepObj[path[0]][path[1]] = (this.form[key] && this.form[key].id) ?? this.form[key];
        } else if (path.length === 3) {
          if(!deepObj[path[0]]) {
            deepObj[path[0]] = {}
          }
          if(!deepObj[path[0]][path[1]]) {
            deepObj[path[0]][path[1]] = {}
          }
          deepObj[path[0]][path[1]][path[2]] = (this.form[key] && this.form[key].id) ?? this.form[key];
        }
        return deepObj;
      },
      prepareFormBeforeSubmit() {
        let prepareFormBeforeSubmit = {};

        for (let key in this.form) {

          if (this.fields[key].writingName) {

            if (this.fields[key].writingName.includes('.')) {
              prepareFormBeforeSubmit = this.addDeepKeyToObj(prepareFormBeforeSubmit, key, this.fields[key].writingName)
            } else {
                prepareFormBeforeSubmit[this.fields[key].writingName] = this.form[key];
            }
            continue;
          } 
          
          if (key.includes('.')) {
            prepareFormBeforeSubmit = this.addDeepKeyToObj(prepareFormBeforeSubmit, key)
            continue;
          } 
          
          if (key === 'number') {
            prepareFormBeforeSubmit[key] = +this.form[key];
            continue;
          } 
          
          if (this.form[key] && this.form[key].id) {
            prepareFormBeforeSubmit[key] = this.form[key].id;
            continue;
          } 
          
          prepareFormBeforeSubmit[key] = this.form[key];

        }
          if (!prepareFormBeforeSubmit['data']) {
            prepareFormBeforeSubmit['data'] = {}
          }
        if (prepareFormBeforeSubmit.data?.helicopters && prepareFormBeforeSubmit.data.helicopters[0] && prepareFormBeforeSubmit.data.helicopters[0].id) {
          prepareFormBeforeSubmit.data.helicopters = prepareFormBeforeSubmit.data.helicopters.map(helicopter => helicopter.id)
        }

        if (prepareFormBeforeSubmit.data?.standards && prepareFormBeforeSubmit.data.standards[0] && prepareFormBeforeSubmit.data.standards[0].id) {
          prepareFormBeforeSubmit.data.standards = prepareFormBeforeSubmit.data.standards.map(standard => standard.id)
        }

        if (prepareFormBeforeSubmit.data?.workTypes && prepareFormBeforeSubmit.data.workTypes[0] && prepareFormBeforeSubmit.data.workTypes[0].id) {
          prepareFormBeforeSubmit.data.workTypes = prepareFormBeforeSubmit.data.workTypes.map(workType => workType.id)
        }
        
        return prepareFormBeforeSubmit;
      },
      async addPosition() {
        await this.$store.dispatch(`catalog/add_${this.localDataName}`, {
          form: this.prepareFormBeforeSubmit(),
        });
        this.$emit('close-and-update');
      },
      async updatePosition() {
        await this.$store.dispatch(`catalog/update_${this.localDataName}`, {
          id: this.id,
          form: this.prepareFormBeforeSubmit(),
        });
        this.$emit('close-and-update');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .add-position {
    width: 1108px;
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
      align-items: flex-start;
      flex-wrap: wrap;
      margin: -10px -17px;
    }

    &__col {
      width: calc(100% / 3 - 34px);
      margin: 10px 17px;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 40px -5px 0;
    }

    &__btn {
      width: 152px;
      margin: 0px 5px;
    }
  }
</style>
