/*Подключение компонентов*/
const Catalog = () => import('../views/Catalog');
const CatalogItem = () => import('../views/CatalogItem');
const CatalogItemHistory = () => import('../views/CatalogItemHistory');
const CatalogPoint = () => import('../views/CatalogPoint');

const MODULE = 'catalog';

export default [
  {
    path: '/catalog',
    name: 'PageCatalog',
    component: Catalog,
    meta: {
      title: 'Справочники',
      MODULE,
    },
  },
  {
    path: '/catalog/:parent/:id/history',
    name: 'history',
    component: CatalogItemHistory,
    meta: {
      MODULE,
    },
  },
  {
    path: '/catalog/work-types',
    name: 'work-types',
    component: CatalogItem,
    meta: {
      localDataName: 'workType',
      tableTitle: 'Справочник Виды и подвиды работ',
      MODULE,
      SUBMODULE: 'WorkType',
      TYPE: 'work-type',
    },
  },
  {
    path: '/catalog/work-names',
    name: 'work-name',
    component: CatalogItem,
    meta: {
      localDataName: 'workName',
      tableTitle: 'Справочник Наименования работ',
      MODULE,
      SUBMODULE: 'WorkName',
      TYPE: 'work-name',
    },
  },
  {
    path: '/catalog/gov-customers',
    name: 'gov-customers',
    component: CatalogItem,
    meta: {
      localDataName: 'govCustomers',
      tableTitle: 'Справочник Государственные заказчики',
      MODULE,
      SUBMODULE: 'Customer',
      TYPE: 'customer',
    },
  },
  {
    path: '/catalog/subcontractor',
    name: 'subcontractor',
    component: CatalogItem,
    meta: {
      localDataName: 'subcontractor',
      tableTitle: 'Справочник Исполнители/ВП',
      MODULE,
      SUBMODULE: 'Subcontractor',
      TYPE: 'subcontractor',
    },
  },
  {
    path: '/catalog/recipients',
    name: 'recipients',
    component: CatalogItem,
    meta: {
      localDataName: 'recipient',
      tableTitle: 'Справочник Получатели',
      MODULE,
      SUBMODULE: 'Recipient',
      TYPE: 'recipient',
    },
  },
  {
    path: '/catalog/helicopter',
    name: 'helicopter',
    component: CatalogItem,
    meta: {
      localDataName: 'helicopter',
      tableTitle: 'Справочник Типы и модификации ВТ',
      MODULE,
      SUBMODULE: 'Helicopter',
      TYPE: 'helicopter',
    },
  },
  {
    path: '/catalog/component',
    name: 'component',
    component: CatalogItem,
    meta: {
      localDataName: 'catalogComponents',
      tableTitle: 'Справочник КИ',
      MODULE,
      SUBMODULE: 'Component',
      TYPE: 'component',
    },
  },
  {
    path: '/catalog/units',
    name: 'units',
    component: CatalogItem,
    meta: {
      localDataName: 'catalogUnits',
      tableTitle: 'Справочник Единицы измерения',
      MODULE,
      SUBMODULE: 'Unit',
      TYPE: 'unit',
    },
  },
  {
    path: '/catalog/system-users',
    name: 'system-users',
    component: CatalogItem,
    meta: {
      localDataName: 'systemUsers',
      tableTitle: 'Справочник Пользователи системы',
      MODULE,
      TYPE: 'work-type',
    },
  },
  {
    path: '/catalog/status-contract',
    name: 'status-contract',
    component: CatalogItem,
    meta: {
      localDataName: 'statusContract',
      tableTitle: 'Справочник Статусы контрактов',
      MODULE,
      SUBMODULE: 'StatusContract',
      TYPE: 'status-contract',
    },
  },
  {
    path: '/catalog/status-supply',
    name: 'status-supply',
    component: CatalogItem,
    meta: {
      localDataName: 'statusSupply',
      tableTitle: 'Справочник Статусы работы в перечне',
      MODULE,
      SUBMODULE: 'StatusSupply',
      TYPE: 'status-supply',
    },
  },
  {
    path: '/catalog/status-stage',
    name: 'status-stage',
    component: CatalogItem,
    meta: {
      localDataName: 'statusStage',
      tableTitle: 'Справочник Статусы этапов',
      MODULE,
      SUBMODULE: 'StatusStage',
      TYPE: 'status-stage',
    },
  },
  {
    path: '/catalog/status-adjustment',
    name: 'status-adjustment',
    component: CatalogItem,
    meta: {
      localDataName: 'statusAdjustment',
      tableTitle: 'Справочник Статусы корректировок',
      MODULE,
      SUBMODULE: 'StatusAdjustment',
      TYPE: 'status-adjustment',
    },
  },
  {
    path: '/catalog/status-specification',
    name: 'status-specification',
    component: CatalogItem,
    meta: {
      localDataName: 'statusSpecification',
      tableTitle: 'Справочник Статусы спецификаций',
      MODULE,
      SUBMODULE: 'StatusSpecification',
      TYPE: 'status-specification',
    },
  },
  {
    path: '/catalog/performers-prices',
    name: 'performers-prices',
    component: CatalogItem,
    meta: {
      localDataName: 'performers-prices',
      tableTitle: 'Справочник Прайс-лист Исполнители',
      MODULE,
      TYPE: 'work-type',
    },
  },
  {
    path: '/catalog/catalog-standarts',
    name: 'catalog-standarts',
    component: CatalogItem,
    meta: {
      localDataName: 'catalogStandarts',
      tableTitle: 'Справочник НТД',
      MODULE,
      SUBMODULE: 'Standard',
      TYPE: 'standard',
    },
  },
  {
    path: '/catalog/agency',
    name: 'agency',
    component: CatalogItem,
    meta: {
      localDataName: 'agency',
      tableTitle: 'Справочник военых представительств',
      MODULE,
      SUBMODULE: 'Agency',
      TYPE: 'agency',
    },
  },
  {
    path: '/catalog/control-points',
    name: 'control-points',
    component: CatalogPoint,
    meta: {
      localDataName: 'controlPoints',
      tableTitle: 'Контрольные точки',
      MODULE,
      SUBMODULE: 'ControlPoints',
      TYPE: 'point',
    }
  }
];
