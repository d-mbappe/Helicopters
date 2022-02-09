const LayoutTable = () => import(/* webpackChunkName: "Contracts" */ "../views/LayoutTable");
const LayoutParentWithTabs = () => import(/* webpackChunkName: "Contracts" */ "../views/LayoutParentWithTabs");
const MODULE = 'cooperation';

export default [
  {
    path: '/contract/:number/:id/cooperations',
    name: 'Cooperations',
    component: LayoutParentWithTabs,
    meta: {
      MODULE,
    },
    children:[
      {
        path: 'works-list',
        name: 'CooperationWorksList',
        component: LayoutTable,
        meta: {
          MODULE,
          SUBMODULE: 'WorksList'
        }
      },
      {
        path: 'requests',
        name: 'CooperationQueries',
        component: LayoutTable,
        meta: {
          MODULE,
          SUBMODULE: 'Requests'
        }
      },
      {
        path: 'specifications',
        name: 'CooperationSpecifications',
        component: LayoutTable,
        meta: {
          MODULE,
          SUBMODULE: 'Specifications'
        }
      },
      {
        path: 'prices',
        name: 'CooperationPrices',
        component: LayoutTable,
        meta: {
          MODULE,
          SUBMODULE: 'Prices'
        }
      },
      {
        path: 'progress',
        name: 'CooperationProgress',
        component: LayoutTable,
        meta: {
          MODULE,
          SUBMODULE: 'Progress'
        }
      },
      {
        path: 'documents-foundation',
        name: 'CooperationDocumentsFoundation',
        component: LayoutTable,
        meta: {
          MODULE,
          SUBMODULE: 'DocumentsFoundation'
        }
      },
      {
        path: 'agrees',
        name: 'CooperationAgrees',
        component: LayoutTable,
        meta: {
          MODULE,
          SUBMODULE: 'Agrees'
        }
      },
    ]
  }
]
