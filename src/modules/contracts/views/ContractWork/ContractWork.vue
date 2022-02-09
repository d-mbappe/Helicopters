<template>
  <section>
    <div class="conract-work">
      <div class="conract-work__nav">
        <router-link
          :to="{name: item.linkName}"
          v-for="(item, i) in nav"
          :key="i"
          class="conract-work__link"
        >
          {{ item.title }}
        </router-link>
      </div>

      <div class="conract-work__content">
        <router-view />
      </div>
    </div>
  </section>
</template>

<script>
  import {mapActions, mapMutations} from "vuex";

  export default {
    name: 'PageContractWork',
    data: () => ({
      nav: [
        {
          title: 'Формирование перечня',
          linkName: 'PageContractWorkList',
        },
        {
          title: 'Распределение работ',
          linkName: 'PageContractWorkDistribution',
        },
        {
          title: 'Согласование перечня',
          linkName: 'PageContractWorkAgree',
        },
        {
          title: 'Корректировки',
          linkName: 'PageContractWorkCorrects',
        },
        {
          title: 'Сопроводительные док.',
          linkName: 'ContractWorkDocs',
        },
      ],
    }),
    created() {
      this.autoCompleteFields();
    },

    watch:{
      $route (to, from){
        this.autoCompleteFields()
      }
    },

    computed:{
      contractId() {
        return +this.$route.params.id;
      },
    },

    methods: {
      ...mapActions("contracts", {
        getSupplyRecipient: "getSupplyRecipient", // Автозаполнение поля “Получатель”
        getSupplyWork: "getSupplyWork", // “Наименование работы”
        getSupplyStandart: "getSupplyStandart", //“НТД”
        getSupplyForm: "getSupplyForm",
      }),
      ...mapMutations("contracts", {
        changeHelicopters: "changeHelicopters",
        changeWorkTypes: "changeWorkTypes",
        changeRecipients: "changeRecipients",
      }),

      autoCompleteFields: async function () {
        const [
          {
            data: { workTypes, units, helicopters },
          },
          {
            data: { data: recipients },
          },
          {
            data: { data: works },
          },
          {
            data: { data: standart },
          },
        ] = await Promise.all([
          this.getSupplyForm({ contractId: this.contractId }),
          this.getSupplyRecipient({ id: +this.contractId }),
          this.getSupplyWork({ id: +this.contractId }),
          this.getSupplyStandart({ id: +this.contractId }),
        ]);

        this.recipients = recipients;
        this.works = works;
        this.standards = standart;
        this.workTypes = workTypes;
        this.units = units;
        this.helicopters = helicopters;

        //запись в store
        this.changeHelicopters({ helicopters });
        this.changeWorkTypes({ workTypes });
        this.changeRecipients({ recipients });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .conract-work {
    display: flex;
    flex-direction: column;

    &__nav {
      display: flex;
      align-items: center;
      margin: 0px -5px 30px;
    }

    &__link {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px;
      margin: 0px 5px;
      background: #E8F1FD;
      border-radius: 4px;
      font-size: 12px;
      line-height: 14px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.01em;
      color: $accent-blue;
      text-decoration: none;
      transition: all .3s;
      &.router-link-active, &:hover {
        color: $white;
        background: $accent-blue;
      }
    }
  }
</style>
