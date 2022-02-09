<template>
  <div>
    <div class="panel">
      <BaseButton 
        :text="'Создать спецификацию ГК'" 
        @click="$router.push({ name: 'formation-consolidated-act'})"
      />
    </div>
    <section>
      <Table 
        :data="specification"
        :columns="specificationColumns" 
        tableTitle="Таблица Спецификации"
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
          <IconSwitch
            name="excel"
            color="#90A0B7"
            :isButton="true"
          />
          <IconSwitch
            name="filter"
            color="#90A0B7"
            :isButton="true"
          />
          <BaseButton 
            :text="'Создать спецификацию ГК'" 
            @click="$router.push({ name: 'formation-consolidated-act'})"
          />
        </template>
      </Table>
    </section>
  </div>
</template>
<script>
import Table from '@/components/common/Table';

import { mapGetters } from 'vuex';
import IconSwitch from "@/components/simple/IconSwitch";
import BaseButton from '@/components/simple/BaseButton';


export default {
  name: 'Formation',
  components: {
    Table,
    IconSwitch,
    BaseButton
  },
  computed: {
    ...mapGetters([
      'specificationColumns',
      'specification'
    ]),
  },
  data() {
    return {
    };
  },
  methods: {
    // ...mapActions([
    //   'getSpecifications',
    // ])
  },
  mounted() {
    // if (!this.specifications) {
    //   this.getSpecifications();
    // }
  }
}
</script>
<style lang="scss">

</style>