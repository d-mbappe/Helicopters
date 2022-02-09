/*Подключение компонентов*/
const Specifications = () => import(/* webpackChunkName: "Specifications" */ "../layout/Specifications");
const GK = () => import(/* webpackChunkName: "GK" */ "../views/GK");
const Cards = () => import(/* webpackChunkName: "Cards" */ "../views/Cards");
const Table = () => import(/* webpackChunkName: "Table" */ "../views/Table");
const Formation = () => import(/* webpackChunkName: "Formation" */ "../views/Formation");
const Acts = () => import(/* webpackChunkName: "Acts" */ "../views/Acts");
const ActsTable = () => import(/* webpackChunkName: "ActsTable" */ "../views/ActsTable");
const TableSummaryActWithRecipient = () => import(/* webpackChunkName: "TableSummaryActWithRecipient" */ "../views/TableSummaryActWithRecipient");
const GeneralNoticeCards = () => import(/* webpackChunkName: "GeneralNoticeCards" */ "../views/GeneralNoticeCards");
const GenerationGeneralNotice = () => import(/* webpackChunkName: "GenerationGeneralNotice" */ "../views/GenerationGeneralNotice");
const GeneralNoticeDataTable = () => import(/* webpackChunkName: "GeneralNoticeDataTable" */ "../views/GeneralNoticeDataTable");
const SummaryActsCards = () => import(/* webpackChunkName: "SummaryActsCards" */ "../views/SummaryActsCards");
const FormationConsolidatedAct = () => import(/* webpackChunkName: "FormationConsolidatedAct" */ "../views/FormationConsolidatedAct");
const TableConsolidatedAct = () => import(/* webpackChunkName: "TableConsolidatedAct" */ "../views/TableConsolidatedAct");
const TableReportsConsolidatedAct = () => import(/* webpackChunkName: "TableReportsConsolidatedAct" */ "../views/TableReportsConsolidatedAct");

export default [
  {
    path: '/contract/:number/:id/specifications',
    name: 'Specifications',
    component: Specifications,
    children: [
      {
        name: 'gk',
        path: 'gk',
        component: GK
      },
      {
        name: 'cards',
        path: 'cards',
        component: Cards
      },
      {
        name: 'table',
        path: 'table',
        component: Table
      },
      {
        name: 'formation',
        path: 'formation',
        component: Formation
      },
      {
        name: 'acts',
        path: 'acts',
        component: Acts
      },
      {
        name: 'acts-table',
        path: 'acts-table',
        component: ActsTable
      },
      {
        name: 'table-summary-act-with-recipient',
        path: 'table-summary-act-with-recipient',
        component: TableSummaryActWithRecipient
      },
      {
        name: 'general-notice-cards',
        path: 'general-notice-cards',
        component: GeneralNoticeCards
      },
      {
        name: 'generation-general-notice',
        path: 'generation-general-notice',
        component: GenerationGeneralNotice
      },
      {
        name: 'general-notice-data-table',
        path: 'general-notice-data-table',
        component: GeneralNoticeDataTable
      },
      {
        name: 'summary-acts-cards',
        path: 'summary-acts-cards',
        component: SummaryActsCards
      },
      {
        name: 'formation-consolidated-act',
        path: 'formation-consolidated-act',
        component: FormationConsolidatedAct
      },
      {
        name: 'table-consolidated-act',
        path: 'table-consolidated-act',
        component: TableConsolidatedAct
      },
      {
        name: 'table-reports-consolidated-act',
        path: 'table-reports-consolidated-act',
        component: TableReportsConsolidatedAct
      }
    ]
  }
]
