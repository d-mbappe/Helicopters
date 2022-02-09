/*Подключение компонентов*/
const Contracts = () => import(/* webpackChunkName: "Contracts" */ "../views/Contracts");
const Contract = () => import(/* webpackChunkName: "Contracts" */ "../views/Contract");

const ContractWork = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractWork/ContractWork");
const ContractWorkList = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractWork/List");
const ContractWorkDistribution = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractWork/Distribution");
const ContractWorkAgree = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractWork/Agree");
const ContractWorkCorrects = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractWork/Corrects");
const ContractWorkCorrectsEdit = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractWork/CorrectsEdit");
const ContractWorkCorrectsHistory = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractWork/CorrectsHistory");
const ContractWorkDocs = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractWork/Docs");

const ContractAgrees = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractAgrees");
const ContractDocuments = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractDocuments");
const ContractSettles = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractSettles");
const ContractSettlesClient = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractSettlesClient");
const ContractSettlesExecutor = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractSettlesExecutor");
const ContractSettlesExecutorDetails = () => import(/* webpackChunkName: "Contracts" */ "../views/ContractSettlesExecutorDetails");

const MODULE = 'contract';

export default [
  {
    path: '/contracts',
    name: 'PageContracts',
    component: Contracts,
    meta: {
      MODULE,
    }
  },
  {
    path: '/contract/:number/:id',
    name: 'PageContract',
    component: Contract,
    meta: {
      MODULE,
    }
  },
  {
    path: '/contract/:number/:id/works',
    name: 'ContractWork',
    component: ContractWork,
    meta: {
      MODULE,
    },
    children: [
      {
        path: 'list',
        name: 'PageContractWorkList',
        component: ContractWorkList,
        meta: {
          MODULE,
          SUBMODULE: 'Supply'
        }
      },
      {
        path: 'distribution',
        name: 'PageContractWorkDistribution',
        component: ContractWorkDistribution,
        meta: {
          MODULE,
          SUBMODULE: 'Specialist',
        }
      },
      {
        path: 'agree',
        name: 'PageContractWorkAgree',
        component: ContractWorkAgree,
        meta: {
          MODULE,
          SUBMODULE: 'Agreement',
        }
      },
      {
        path: 'corrects',
        name: 'PageContractWorkCorrects',
        component: ContractWorkCorrects,
        meta: {
          MODULE,
          SUBMODULE: 'Agreement',
        }
      },
      {
        path: 'corrects/:number/:id/edit',
        name: 'PageContractWorkCorrectsEdit',
        component: ContractWorkCorrectsEdit,
        meta: {
          MODULE,
        }
      },
      {
        path: 'corrects/:number/:id/history',
        name: 'PageContractWorkCorrectsHistory',
        component: ContractWorkCorrectsHistory,
        meta: {
          MODULE,
          SUBMODULE: 'Agreement',
        }
      },
      {
        path: 'docs',
        name: 'ContractWorkDocs',
        component: ContractWorkDocs,
        meta: {
          MODULE,
          SUBMODULE: 'Document'
        }
      },
    ],
  },
  {
    path: '/contract/:number/:id/agrees',
    name: 'PageContractAgrees',
    component: ContractAgrees,
    meta: {
      MODULE,
    }
  },
  {
    path: '/contract/:number/:id/documents',
    name: 'PageContractDocuments',
    component: ContractDocuments,
    meta: {
      MODULE,
    }
  },
  {
    path: '/contract/:number/:id/settles',
    name: 'PageContractSettles',
    component: ContractSettles,
    meta: {
      MODULE,
    }
  },
  {
    path: '/contract/:number/:id/settles/client/:id',
    name: 'PageContractSettlesClient',
    component: ContractSettlesClient,
    meta: {
      MODULE,
    }
  },
  {
    path: '/contract/:number/:id/settles/executor/:id',
    name: 'PageContractSettlesExecutor',
    component: ContractSettlesExecutor,
    meta: {
      MODULE,
    }
  },
  {
    path: '/contract/:number/:id/settles/executor/:id/details',
    name: 'PageContractSettlesExecutorDetails',
    component: ContractSettlesExecutorDetails,
    meta: {
      MODULE,
    }
  },
]
