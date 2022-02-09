<template>
  <section>
    <div class="contracts">
      <div class="contracts__top" :class="{align_right: !contracts.data.length}">
        <div class="contracts__sort" v-if="contracts.data.length">Контракты:
          <Select
              v-model="viewStatus"
              title="name"
              class="inpt__input--default"
              :options="viewStatuses"
              @input="updateContractList($event)"
              id="statuses"
              isStatusesSelect
          ></Select>
        </div>
        <div class="contracts__btns">
          <div class="contracts__filters" v-if="!!contracts.data.length">
            <div @click="grid = true" class="contracts__filter">
              <IconSwitch name="grid"
                          :color="grid ? '#109CF1' : '' "
                          :key="grid"/>
<!--              <img src="@/assets/svg/grid.svg" />-->
            </div>
            <div @click="grid = false" class="contracts__filter">
              <IconSwitch name="list"
                          :color="!grid ? '#109CF1' : '' "
                          :key="grid"/>
<!--              <img src="@/assets/svg/list.svg" />-->
            </div>
          </div>
          <v-btn
            @click="isEditModalActive = true"
            label="Новый контракт"
            class="btn--primary btn--normal contracts__btn"
          />
        </div>
      </div>

      <div v-if="grid && contracts" class="contracts__cards">
        <contract-card
          v-for="(contract, contractKey) in contracts.data"
          :key="contractKey"
          :item="contract"
          @edit-item="editItem"
          class="contracts__item"
        />
      </div>

      <div v-else class="contracts__list">
        <div class="contracts__list-header">
          <div class="contracts__list-item">
            <div class="contracts__list-value">Номер ГОСТ Контракта</div>
            <div class="contracts__list-value">Заказчик</div>
            <div class="contracts__list-value contracts__list-value--price">
              Цена (руб.)
            </div>
            <div class="contracts__list-value contracts__list-value--date">
              Дата Контракта
            </div>
            <div class="contracts__list-value contracts__list-value--date">
              Срок выполнения
            </div>
          </div>
        </div>
        <div class="contracts__list-scroll" v-if="contracts">
          <div class="contracts__list-body">
            <div
              v-for="(contract, contractKey) in contracts.data"
              :key="contractKey"
              :class="`contracts__list-item--${contract.status.name.substring(0,2)}`"
              class="contracts__list-item"
              @click="router.push({ path: `/contract/${item.id}` })"
            >
              <div class="contracts__list-value">
                {{ contract.number }}
              </div>
              <div class="contracts__list-value">
                {{ contract.customer.name }}
              </div>
              <div class="contracts__list-value contracts__list-value--price">
                {{ contract.price }}
              </div>
              <div class="contracts__list-value contracts__list-value--date">
                {{ contract.date }}
              </div>
              <div class="contracts__list-value contracts__list-value--date">
                {{ contract.deadline }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Paginator
        v-if="contracts.data.length"
        :pages-count="contracts.length"
        @change-table-state="changeTableState"
        :total="contracts.total"
        :limit="limit"
      />
    </div>

    <add-contract
      v-if="isEditModalActive"
      @close="closeModal"
      @close-and-update="updateAndCloseModal"
      :editForm="editForm"
      :hide-server-fields="hideServerFields"
    />
  </section>
</template>

<script>
import ContractCard from "../components/Contracts/ContractCard";
import { mapGetters, mapActions } from "vuex";
import Paginator from "@/components/common/Paginator";
import IconSwitch from "../../../components/simple/IconSwitch";
import Select from "../../../components/ui/Select";
export default {
  name: "Contracts",
  components: {
    ContractCard,
    Paginator,
    IconSwitch,
    Select,
    AddContract: () => import("../modals/AddContract"),
  },
  data: () => ({
    isEditModalActive: false,
    grid: true,
    hideServerFields: ["id"],
    editForm: null,
    page: 1,
    limit: 25,
    viewStatus: 'Все'
  }),
  computed: {
    ...mapGetters("contracts", {
      contracts: "contracts",
    }),

    viewStatuses() {
      if(this.contracts?.statuses) {
        return [{id: 0, name: 'Все' }, ...this.contracts.statuses]
      }
    }
  },
  mounted() {
    if (!this.contracts) {
      this.getContractsList({
        page: this.page,
        limit: this.limit,
      });
    }
  },
  methods: {
    ...mapActions("contracts", {
      getContractsList: "getContractsList",
    }),
    closeModal() {
      this.editForm = null;
      this.isEditModalActive = false;
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
    updateAndCloseModal() {
      this.closeModal();
      this.getContractsList({
        page: this.page,
        limit: this.limit,
      });
    },
    changeTableState({ page, limit }) {
      this.page = page;
      this.limit = limit;

      this.getContractsList({
        page: this.page,
        limit: this.limit,
      })
    },
    updateContractList(e) {
      if(e.id !== 0) {
        this.getContractsList({
          page: this.page,
          limit: this.limit,
          filter: {
            status: e.id
          }
        })
      } else {
        this.getContractsList({
          page: this.page,
          limit: 25,
        })
      }

    }
  },
};
</script>

<style lang="scss" scoped>
.contracts {
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    &.align_right {
      justify-content: flex-end;
    }
  }

  &__sort {
    font-size: 12px;
    line-height: 14px;
    color: $table-gray;
  }

  &__btns {
    display: flex;
    align-items: center;
  }

  &__filters {
    display: flex;
    margin: 0px 15px 0 -5px;
  }
  &__filter {
    cursor: pointer;
    margin: 0px 5px;
  }

  &__cards {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: -10px;
  }

  &__item {
    width: calc(100% / 2 - 20px);
    margin: 10px;
  }

  &__btn {
    width: 160px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }

  &__paginations {
    display: flex;
    align-items: center;
  }

  &__pagination {
    display: flex;
    align-items: center;
    margin-left: 20px;
    span {
      cursor: pointer;
      font-size: 13px;
      line-height: 15px;
      font-weight: 500;
      letter-spacing: 0.01em;
      width: 54px;
      height: 42px;
      border: 1px solid #d3d8dd;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $white;
      &.active {
        background: #f7f7f7;
      }
      &:first-child {
        border-radius: 4px 0 0 4px;
      }
      &:last-child {
        border-radius: 0 4px 4px 0;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    &-status {
      width: 5px;
      height: 100%;
      background-color: #000;
    }
    &-header {
      background: $white;
      box-shadow: 0px 1px 0px #ebeff2;
      margin-bottom: 1px;
      .contracts__list-value {
        color: $table-black;
        font-weight: 500;
      }
    }

    &-body {
      height: 240px;
      overflow: auto;
      scrollbar-width: thin;
      scrollbar-color: #a5acb1 #e3e8ec;
      &::-webkit-scrollbar {
        width: 3px;
        border-radius: 6px;
      }
      &::-webkit-scrollbar-track {
        background: #e3e8ec;
        border-radius: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #a5acb1;
      }
    }

    &-item {
      display: flex;
      align-items: center;
      padding: 22px 0;
      background: $white;
      box-shadow: 0px 1px 0px #ebeff2;
      margin-bottom: 1px;
      position: relative;
      &:last-child {
        margin-bottom: 0;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 12px;
      }
      &--За {
        &:before {
          background: $green;
        }
      }
      &--На{
        &:before {
          background: $yellow;
        }
      }
      &--Пр {
        &:before {
          background: $purple;
        }
      }
    }

    &-value {
      flex: 0 0 auto;
      width: 250px;
      padding: 0px 10px;
      font-size: 13px;
      line-height: 15px;
      letter-spacing: 0.01em;
      color: $table-gray;
      &:first-child {
        padding-left: 50px;
      }

      &--price {
        flex: 0 0 auto;
        width: 130px;
      }

      &--date {
        flex: 0 0 auto;
        width: 150px;
      }
    }
  }
}
</style>
