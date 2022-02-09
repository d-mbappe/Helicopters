<template>
  <div class="paginator">
    <div class="paginator__count">
      Показать по:
      <Select
        :value="limit"
        @input="changeLimit"
        :options="paginationCountVariants"
        isPaginatorSelect
      />
    </div>

    <div class="table-item__views">
      <BaseButton
        v-if="isMorePossible"
        text="Показать еще"
        class="paginator__more_btn"
        @click="showMore"
      />
    </div>
    <div class="pagination" v-if="isMorePossible">
      <span
        v-for="(page, key) in paginationLength"
        :key="key"
        :class="{ active: page === activePage }"
        @click="changePage(page)"
      >
        {{ page }}
      </span>
    </div>
  </div>
</template>
<script>
  import BaseButton from '@/components/simple/BaseButton';
  import Select from '@/components/ui/Select';
  export default {
    name: 'Paginator',
    data: () => ({
      limit: 25,
      activePage: 1,
    }),
    components: {
      BaseButton,
      Select,
    },
    props: {
      haveShowMoreBtn: {
        type: Boolean,
        default: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    computed: {
      paginationCountVariants() {
        if (this.total <= 10) {
          return [10];
        }
        if (this.total <= 25) {
          return [10, 25];
        }
        if (this.total <= 50) {
          return [25, 50];
        }
        return [25, 50, 100];
      },
      isMorePossible() {
        return this.haveShowMoreBtn && this.total > this.limit;
      },
      paginationLength() {
        return Math.ceil(this.total / this.limit);
      },
    },
    methods: {
      changePage(page) {
        this.activePage = page;
        this.$emit('change-table-state', {
          page: this.activePage,
          limit: this.limit,
        });
      },
      changeLimit(value) {
        this.limit = value;
        this.$emit('change-table-state', {
          page: this.activePage,
          limit: this.limit,
        });
      },
      showMore() {
        this.limit += 25;
        this.$emit('change-table-state', {
          page: this.activePage,
          limit: this.limit,
        });
      },
    },
  };
</script>

<style lang="scss">
  .paginator {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    &__count {
      display: flex;
      align-items: center;
      color: $table-gray;
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 0.01em;
      span {
        color: $accent-blue;
      }
    }
    .pagination {
      display: flex;
      align-items: center;
      span {
        cursor: pointer;
        width: 54px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $white;
        border: 1px solid #d3d8dd;
        color: $table-black;
        font-size: 13px;
        line-height: 15px;
        font-weight: 500;
        letter-spacing: 0.01em;
        &:first-child {
          border-radius: 4px 0 0 4px;
        }
        &:last-child {
          border-radius: 0 4px 4px 0;
        }
        &.active {
          background: #f7f7f7;
        }
      }
    }
  }
</style>
