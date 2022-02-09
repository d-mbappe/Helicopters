<template>
  <div class="add-position__form" v-if="form">
    <template
        v-if="!isFilter"
    >
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
    </template>
    <template
        v-else-if="isFilter"
    >
      <div
          class="add-position__col"
          v-for="(field, fieldKey) in fields"
          :key="fieldKey"
          v-if="field.isFilterable"
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
    </template>

  </div>
</template>

<script>
  import vocabulary from '@/utils/vocabulary';
  import Select from '@/components/ui/Select';
  export default {
    name: "BaseForm",
    components: {
      Select,
    },
    data: () => ({
      form: {},
      vocabulary: vocabulary,
      // id: null,
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
      },
      isFilter: {
        type: Boolean,
        default: false,
      }
    },
    mounted() {
      if (this.editForm) {
        Object.keys(this.fields).forEach((field) => {
          const fieldSplitted = field.split('.')
          if(field.split('.').length == 2) {
            this.$set(this.form, field, this.editForm[fieldSplitted[0]][fieldSplitted[1]]);
          } else if (field.split('.').length == 3) {
            this.$set(this.form, field, this.editForm[fieldSplitted[0]][fieldSplitted[1]][fieldSplitted[2]]);
          } else {
            this.$set(this.form, field, this.editForm[field]);
          }
        });
      } else {
        Object.keys(this.fields).forEach((field) => {
          this.$set(this.form, field, null);
        });
      }
      this.getForm();
    },
    computed: {
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
    watch: {
      form() {
        this.$emit('changeForm', this.form)
      }
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
    }
  }
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