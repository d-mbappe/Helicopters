<template>
  <div>
    <div class="catalog">
      <CardsGallery :data="specifications" />
      <Table />
    </div>
  </div>
</template>
<script>
import CardsGallery from "@/components/common/CardsGallery";
import Table from "@/components/common/Table";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "TableConsolidatedAct",
  components: {
    CardsGallery,
    Table,
  },
  computed: {
    ...mapGetters(["specifications"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getSpecifications"]),
  },
  mounted() {
    if (!this.specifications) {
      this.getSpecifications();
    }
  },
};
</script>
<style lang="scss" scoped>
.catalog {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 10px;

  &__card {
    width: calc(100% / 4 - 20px);
    margin: 10px;
  }
}
</style>
