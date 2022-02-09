import Vue from 'vue';
import Vuex from 'vuex';
import { AXIOS } from './axios';

/*Модули*/
import bpmn from '@/modules/bpmn/store/index';
import specifications from '@/modules/specifications/store/index';
import contracts from '@/modules/contracts/store/index';
import catalog from '@/modules/catalog/store/index';
import cooperation from '@/modules/cooperation/store/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breadCrumbState: null,
  },
  actions: {
    getSpecifications: () => {
      // AXIOS()
    },
  },
  modules: {
    specifications,
    bpmn,
    contracts,
    catalog,
    cooperation
  },
});
