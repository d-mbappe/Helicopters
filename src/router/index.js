import Vue from 'vue';
import VueRouter from 'vue-router';

import contracts from '../modules/contracts/router/index';
import cooperation from '../modules/cooperation/router/index';
import catalog from '../modules/catalog/router/index';
import report from '../modules/report/router/index';
import bpmn from "@/modules/bpmn/router/index";
import specifications from "@/modules/specifications/router/index";
import admin from '../modules/common/router/index';

Vue.use(VueRouter);


const routes = [
  ...contracts, 
  ...catalog, 
  ...report, 
  ...bpmn, 
  ...admin, 
  ...specifications,
  ...cooperation
];

/*const routes = [
  ...common

]*/

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...routes,
    { path: '/', redirect: { path: '/contracts' }}
  ],
});

export default router;
