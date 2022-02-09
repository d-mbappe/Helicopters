<template>
  <div>
    <div class="catalog">
      <CardsGallery :data="specifications" />
    </div>
  </div>
</template>
<script>
import CardsGallery from "@/components/common/CardsGallery";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "SummaryActsCards",
  components: {
    CardsGallery,
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
