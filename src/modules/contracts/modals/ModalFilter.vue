<template>
  <modal-layout
    @close="$emit('close-filter-modal')"
  >
    <div class="modal-filter">
      <div class="modal-filter__top">
        <div class="modal-filter__title">
          Фильтр
        </div>
      </div>
      <!--Фильтр для справочников-->
      <template v-if="getModuleName === 'catalog'">
        <BaseForm
            :fields="fields"
            :editForm="editForm"
            @changeForm="form = $event"
            isFilter
        />
      </template>
      <!--Фильтр для контракта-->
      <template v-else>
        <div class="modal-filter__form">
          <div class="modal-filter__line">
            <div class="modal-filter__col" v-for="( filter, key ) in $config[getModuleName][getSubModule].filters">
              <Select
                  v-model="form[filter]"
                  title="name"
                  class="inpt__input--default"
                  :key="key"
                  :label="vocabulary[getModuleName][getSubModule].filter[filter]"
                  :multiple="false"
                  :searchable="filter === 'recipients'"
                  :options="data[filter]"
                  :id="`filter--${filter}`"

                  @search="search"
              ></Select>
            </div>

          </div>
        </div>
      </template>

      <div class="modal-filter__footer">
        <div class="modal-filter__trash" @click="form = {}">
          <img src="@/assets/svg/trash.svg">
          Очистить фильтр
        </div>

        <div class="modal-filter__btns">
          <v-btn
            label="Отменить"
            @click="$emit('close-filter-modal')"
            class="btn--cancel btn--normal modal-filter__btn modal-filter__btn--cancel"
          />
          <v-btn
            label="Сохранить"
            @click="save"
            class="btn--primary btn--normal modal-filter__btn modal-filter__btn--save"
          />
        </div>
      </div>
    </div>
  </modal-layout>
</template>

<script>
  import ModalLayout from '@/components/common/ModalLayout'
  import Select from "@/components/ui/Select";
  import vocabulary from "@/utils/vocabulary";
  import BaseForm from "./BaseForm";

  export default {
    name: 'ModalFilter',
    components: {
      ModalLayout,
      Select,
      BaseForm,
    },
    data () {
      return {
        form: {},
        vocabulary: vocabulary,
        helicopters: []
      }
    },
    props: {
      filters: {
        type: Array,
        // required: true,
      },
      data: {
        type: Object,
        default: () => {},
      },
      type: {
        type: String,
        default: 'base'
      },

      fields: {
        type: Object,
        // required: true,
      },
      editForm: {
        type: Object,
        default: false,
      }
    },
    computed: {
      getModuleName() {
        return this.$route.meta.MODULE;
      },
      getSubModule() {
        return this.$route.meta.SUBMODULE;
      },
      catalogFilter() {
        let filter = {};

        for (let key in this.form) {
          if ( key === 'number' && this.form[key]) {
            filter[key] = +this.form[key]
          }
          else if (this.form[key]) {
            filter[key] = this.form[key].id;
          }
        }

        return filter;
      },
      contractFilter() {
        let filter = {};

        if(this.type === 'base') {
          filter = {
            helicopter: !!this.form.helicopters ? this.form.helicopters.id : null,
            workType: !!this.form.workTypes? this.form.workTypes.id : null,
            recipient: !!this.form.recipients ? this.form.recipients.id : null,
          };
        } else if (this.type === 'specialist'){
          filter = {
            helicopter: !!this.form.helicopters ? this.form.helicopters.id : null,
            workType: !!this.form.workTypes? this.form.workTypes.id : null,
            specialist : !!this.form.specialists ? this.form.specialists.id : null,
          };
        } else if ((this.type === 'docs')) {
          filter = {
            date: !!this.form.date ? this.form.date : null,
            number: !!this.form.number? this.form.number : null,
          };
        }

        return filter;
      }
    },

    methods: {
      search(val) {
        this.$emit('filter', val)
      },
      save() {
        this.$emit('filter-save',
          this.getModuleName === 'catalog' ? this.catalogFilter : this.contractFilter
        );
        this.$emit('close-filter-modal');
      },

    }
  }
</script>

<style lang="scss" scoped>
  .modal-filter {
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

    &__trash {
      display: flex;
      align-items: center;
      font-size: 13px;
      line-height: 15px;
      letter-spacing: 0.01em;
      color: $accent-blue;
      cursor: pointer;
      img {
        margin-right: 2px;
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
