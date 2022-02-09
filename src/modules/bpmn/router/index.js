/*Подключение компонентов*/
const bpmn = () => import(/* webpackChunkName: "bpmn" */ "../components/bpmn");

export default [
  {
    path: '/bpmn',
    name: 'bpmn',
    component: bpmn
  },
]
