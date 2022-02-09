import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApexCharts from 'vue-apexcharts'
import {config} from './config/index'


/*Бутстрап*/
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$config = config

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueApexCharts)
/*end*/
Vue.component('apexchart', VueApexCharts)

import './plugins/global-components'
import './plugins/vue-select'
/*bpmn*/
import VueBpmnModeler from "vue-bpmn-modeler";
import "vue-bpmn-modeler/lib/vue-bpmn-modeler.css";
Vue.use(VueBpmnModeler);
/*end*/


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
