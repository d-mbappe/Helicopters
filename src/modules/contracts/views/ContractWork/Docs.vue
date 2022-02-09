<template>
  <div class="contract-list">
    <div class="contract-list__add">
      <div class="contract-list__add-top">
        <div class="contract-list__add-title">Документ</div>

        <div
          @click="toggleForm()"
          :class="{ active: !showForm }"
          class="contract-list__add-arrow"
        >
          <img src="@/assets/svg/dropdown.svg" />
        </div>
      </div>

      <div ref="formBody" class="contract-list__add-body">
        <div class="contract-list__form">
          <div class="contract-list__col">
            <v-input
              label="Наименнование"
              v-model="form.title"
              class-el="inpt__input--default"
              id="title"
            />
          </div>
          <div class="contract-list__col">
            <v-input
              label="Номер"
              v-model="form.number"
              class-el="inpt__input--default"
              id="number"
            />
          </div>
          <div class="contract-list__col">
            <v-input
              label="Дата документа"
              @input="changeDate"
              :value="moment(form.date, 'DD.MM.YYYY').format('YYYY-MM-DD')"
              classEl="inpt__input--default"
          />
          <!--            <v-input-->
          <!--              label="Дата документа"-->
          <!--              v-model="form.date"-->
          <!--              class-el="inpt__input&#45;&#45;default"-->
          <!--              id="date"-->
          <!--            />-->
        </div>
      </div>

        <div class="contract-list__add-footer">
          <div class="contract-list__file">
            <label for="upload" class="contract-list__upload">
              <input id="upload" type="file" @change="upload" />
              <img src="@/assets/svg/plus-circle.svg" />
              Загрузить документ
            </label>

            <div v-if="form.file" class="contract-list__preview">
              <img src="@/assets/svg/document.svg" />
              <span>
                {{ form.file.name }}
              </span>
            </div>
          </div>

          <div class="contract-list__add-btns">
            <v-btn
              label="Отменить"
              class="btn--cancel btn--normal contract-list__add-btn"
            />
            <v-btn
              label="Сохранить"
              @click="save"
              class="btn--primary btn--normal contract-list__add-btn"
            />
          </div>
        </div>
      </div>
    </div>

  <div class="contract-list__table">
    <Table
        v-if="documents"
        :data="documents.data"
        :total="documents.total"
        :columns="columns"
        @change-table-state="changeTableState"
        @edit-item="editItem"
        :menu-items="menuItems"
        tableTitle="Таблица Сопроводительных документов"
        commonDots
        commonCheckbox
        rowCheckbox
        rowDots
    >
      <template #titlePanel>
        <IconSwitch
            name="search"
            color="#90A0B7"
            :isButton="true"
            class="icon"
        />
        <IconSwitch name="excel" color="#90A0B7" :isButton="true" />
        <div @click="isFilterActive = true">
          <IconSwitch name="filter" color="#90A0B7" :isButton="true" />
        </div>
      </template>
    </Table>
  </div>

  <ModalFilter
      v-if="isFilterActive"
      type="docs"
      :data="filterData"
      :filters="getFilters"
      @close-filter-modal="isFilterActive = false"
      @filter-save="filterDocuments($event)"
      @filter="filterUpdate"
  />
</div>
</template>

<script>
import Table from "@/components/common/Table";
import IconSwitch from "@/components/simple/IconSwitch";
import ModalFilter from "../../modals/ModalFilter";
import Input from '@/components/ui/Input';
import { mapGetters, mapActions } from "vuex";
import moment from 'moment';

export default {
  name: "PageContractWorkDocs",
  components: {
    Table,
    IconSwitch,
    ModalFilter,
    Input,
  },
  data: () => ({
    moment: moment,
    datesFilter: [],
    numbersFilter: [],
    isFilterActive: false,
    showForm: false,
    page: 1,
    limit: 25,
    editId: null,
    editForm: null,
    form: {
      title: "",
      number: "",
      date: "",
      file: null,
    },
    menuItems: [
      { name: "Редактировать", action: "edit-item" },
      { name: "Согласовать", action: "approve" },
      { name: "На доработку", action: "revision" },
    ],
    columns: [
      "name",
      // "files",
      "number",
      "date",
    ],
  }),
  async mounted() {
    this.toggleForm();
    if (!this.documents) {
      await this.getDocuments({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    }

    this.setFilters();
  },
  computed: {
    ...mapGetters("contracts", {
      documents: "documents",
    }),
    contractId() {
      return Number(this.$route.params.id);
    },
    filterData() {
      return {
        date: this.datesFilter,
        number: this.numbersFilter,
      }
    },
    getModuleName() {
      return this.$route.meta.MODULE;
    },
    getSubModule() {
      return this.$route.meta.SUBMODULE;
    },
    getFilters() {
      return this.$config[this.getModuleName][this.getSubModule].filters;
    },
  },
  methods: {
    ...mapActions("contracts", {
      getDocuments: "getDocuments",
      uploadDocumentFile: "uploadDocumentFile",
      uploadFile: "uploadFile",
    }),
    changeDate(e) {
      this.form.date = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD')
    },
    async save() {
      let formData = new FormData();
      console.log(this.form.file)
      console.log(formData, 'tt')
      // formData.append('file', this.form.file);
      await formData.append('InputFieldFileId', this.form.file)
      console.log(formData, 43)
      this.uploadDocumentFile({
        form: formData,
        contractId: this.contractId
      })

      this.uploadFile(formData)
    },
    editItem(formData) {
      this.editForm = {};

      for (let key in formData) {
        if (key === "helicopters" && formData[key].name) {
          this.editForm[key] = this.helicopterTypes.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }
        if (key === "workType" && formData[key].name) {
          this.editForm[key] = this.workTypes.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }
        if (key === "work" && formData[key].name) {
          this.editForm[key] = this.works.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        if (key === "unit" && formData[key].name) {
          this.editForm[key] = this.units.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        if (key === "recipient" && formData[key].name) {
          this.editForm[key] = this.recipients.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        if (key === "standards" && formData[key].name) {
          this.editForm[key] = this.standards.find(
            (item) => item.name === formData[key].name
          );
          continue;
        }

        this.editForm[key] = formData[key];
      }

      this.isEditModalActive = true;
    },
    toggleForm() {
      const el = this.$refs.formBody;
      if (this.showForm) {
        el.style = `height: ${el.scrollHeight}px`;
        setTimeout(() => {
          el.style = "";
        }, 300);
      } else {
        el.style = `height: ${el.scrollHeight}px`;
        setTimeout(() => {
          el.style = `height: 100%`;
        }, 300);
      }
      this.showForm = !this.showForm;
    },

    changeTableState({ page, limit }) {
      this.page = page;
      this.limit = limit;

      this.getDocuments({
        id: this.contractId,
        page: this.page,
        limit: this.limit,
      });
    },

    upload(e) {
      console.log(e.target.files[0])
      const file = e.target.files[0];
      this.form.file = file;
    },

    setFilters() {
      for (let key in this.documents.data) {
        let item = this.documents.data[key];
        this.datesFilter.push(item.date)
        this.numbersFilter.push(item.number)
      }
    },
    filterDocuments(filter) {
      this.getDocuments({
        id: this.contractId,
        page: this.page,
        limit: this.limit,

        filter: filter,
      });
    },
    filterUpdate(val) {
      this.$store.dispatch(`catalog/recipient`, {
        page: this.page,
        limit: this.limit,
        q: val
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.contract-list {
  display: flex;
  flex-direction: column;

  &__add {
    display: flex;
    flex-direction: column;
    background: $white;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 29px 65px 20px;
    margin-bottom: 20px;
    position: relative;
    &-top {
      display: flex;
      align-items: center;
      margin-bottom: 9px;
    }
    &-title {
      font-size: 18px;
      line-height: 21px;
      font-weight: 500;
      color: $table-black;
    }
    &-arrow {
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 20px;
      transform: rotate(180deg);
      transition: transform 0.3s;
      &.active {
        transform: rotate(0deg);
      }
    }
    &-body {
      display: flex;
      flex-direction: column;
      height: 0px;
      overflow: hidden;
      transition: height 0.3s;
    }
    &-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 40px;
    }
    &-add {
      color: $accent-blue;
      font-size: 13px;
      line-height: 15px;
      font-weight: 500;
      letter-spacing: 0.01em;
      text-decoration: none;
    }
    &-btns {
      display: flex;
      align-items: center;
      margin: 0px -5px;
    }
    &-btn {
      margin: 0px 5px;
      width: 152px;
    }
  }

  &__form {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 11px -17px -10px;
  }

  &__col {
    width: calc(100% / 3 - 34px);
    margin: 10px 17px;
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
}
</style>