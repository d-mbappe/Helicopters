/*Подключение компонентов*/
const Reports = () => import(/* webpackChunkName: "Contracts" */ "../views/Reports");
const ReportView = () => import ('../views/ReportView');
const ReportCreate = () => import ('../views/ReportCreate');

export default [
  {
    path: '/report',
    name: 'report',
    component: Reports
  },
  {
    path: '/report-view',
    name: 'report-view',
    component: ReportView
  },
  {
    path: '/report-create',
    name: 'report-create',
    component: ReportCreate
  } 
]
