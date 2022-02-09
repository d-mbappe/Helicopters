<template>
  <div>
    <!-- <IconSwitch 
      name="filter"
      color="#90A0B7"
      :isButton="true"
      class="icon"
    />
    <IconSwitch 
      name="card-switcher"
      color="#90A0B7"
      :isButton="true"
      class="icon"
    />

    <IconSwitch 
      name="list"
      color="#90A0B7"
      :isButton="true"
      class="icon"
    /> -->
    <BaseButton :text="'Создать спецификацию ГК'" @click="$router.push({ name: 'formation-consolidated-act'})"/>
    
    <CardsGallery :data="specifications" />
  </div>
</template>
<script>
import CardsGallery from "@/components/common/CardsGallery";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "GK",
  components: {
    CardsGallery,
  },
  computed: {
    ...mapGetters(["specifications"]),
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
