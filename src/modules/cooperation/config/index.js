export default {
  tabsMenu: [
    {
      text: 'Перечень работ',
      routerLinkName: 'CooperationWorksList',
      icon: 'print'
    },
    {
      text: 'Запросы',
      routerLinkName: 'CooperationQueries',
      icon: 'blank',
    },
    {
      text: 'цены',
      routerLinkName: 'CooperationSpecifications',
      icon: 'flag',
    },
    {
      text: 'Спецификации',
      routerLinkName: 'CooperationPrices',
      icon: 'reestr',
    },
    {
      text: 'Ход исполнения',
      routerLinkName: 'CooperationProgress',
      icon: 'reestr',
    },
    {
      text: 'документы-основания',
      routerLinkName: 'CooperationDocumentsFoundation',
      icon: 'reestr',
    },
    {
      text: 'Доп. соглашения',
      routerLinkName: 'CooperationAgrees',
      icon: 'reestr',
    },
  ],
  WorksList: {
    formFields: {
      number: "123",
      helicopters: null,
      workType: null,
      work: null,
      unit: null,
      quantity: null,
      recipient: null,
      standards: null,
      components: ["Компонент 1"],
    },
    tableColumns: {
      number: {
        sortable: true,
      },
      helicopters: {
        sortable: true,
      },
      work: {
        sortable: true,
      },
      workType: {
        sortable: true,
      },
      quantity: {
        sortable: true,
      },
      unit: {
        sortable: true,
      },
      recipient: {
        sortable: true,
      },
      standards: {
        sortable: true,
      },
      components: ["Компонент 1"],
    }
  }
}