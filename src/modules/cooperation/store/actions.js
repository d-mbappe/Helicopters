import API from './../api';


export default {
  // асинхронная функция - экшн
  async WorksList({ commit }, { page, limit }) {
    // которая делает запрос и дальше не идёт пока промис не вернёт resolve с ответом
    const { data: workType } = await API.workType({ page, limit }); // то же что и:
    // const response = await API.workType({ page });
    // const data = response.data; // но тут надо смотреть что отдаёт бек
    // const workType = data;
    //в результате получаем тот же workType с теми же данными
    // и отправляем в mutation
    commit('changeWorkType', { workType });
  },

  
  // getworkTyperById({ commit }, { id }) {
  //   return API.workType({ page: 1, limit: 1, filter: { number: id, type: id, agreed: true } });
  // },
  // async workName({ commit }, { page, limit }) {
  //   const { data: workName } = await API.workName({ page, limit });
  //   commit('changeWorkName', { workName });
  // },
  // async govCustomers({ commit }, { page, limit }) {
  //   const { data: govCustomers } = await API.govCustomers({ page, limit });
  //   commit('changeGovCustomers', { govCustomers });
  // },
  // async subcontractor({ commit }, { page, limit }) {
  //   const { data: subcontractor } = await API.subcontractor({ page, limit });
  //   commit('changeSubcontractor', { subcontractor });
  // },
  // async recipient({ commit }, { page, limit }) {
  //   const { data: recipient } = await API.recipient({ page, limit });
  //   commit('changeRecipient', { recipient });
  // },
  // async helicopter({ commit }, { page, limit }) {
  //   const { data: helicopter } = await API.helicopter({ page, limit });
  //   commit('changeHelicopter', { helicopter });
  // },
  // getHelicopterById({ commit }, { id }) {
  //   return API.helicopter({ page: 1, limit: 1, type: null, agreed: true, filter: { number: id }});
  // },
  // async cooperationWorks({ commit }, { page, limit }) {
  //   const { data: cooperationWorks } = await API.cooperationWorks({
  //     page,
  //     limit,
  //   });
  //   commit('changeCooperationWorks', { cooperationWorks });
  // },
  // async statusContract({ commit }, { page, limit }) {
  //   const { data: statusContract } = await API.statusContract({ page, limit });
  //   commit('changeStatusContract', { statusContract });
  // },
  // async statusSupply({ commit }, { page, limit }) {
  //   const { data: statusSupply } = await API.statusSupply({ page, limit });
  //   commit('changeStatusSupply', { statusSupply });
  // },
  // async statusStage({ commit }, { page, limit }) {
  //   const { data: statusStage } = await API.statusStage({ page, limit });
  //   commit('changeStatusStage', { statusStage });
  // },
  // async statusSpecification({ commit }, { page, limit }) {
  //   const { data: statusSpecification } = await API.statusSpecification({
  //     page,
  //     limit,
  //   });
  //   commit('changeStatusSpecification', { statusSpecification });
  // },
  // async cooperationRequests({ commit }, { page, limit }) {
  //   const { data: cooperationRequests } = await API.cooperationRequests({ page, limit });
  //   commit('changeCooperationRequests', { cooperationRequests });
  // },
  // async cooperationDocuments({ commit }, { page, limit }) {
  //   const { data: cooperationDocuments } = await API.cooperationDocuments({
  //     page,
  //     limit,
  //   });
  //   commit('changeCooperationDocuments', { cooperationDocuments });
  // },
  // async cooperationSpecifications({ commit }, { page, limit }) {
  //   const { data: cooperationSpecifications } = await API.cooperationSpecifications({
  //     page,
  //     limit,
  //   });
  //   commit('changeCooperationSpecifications', { cooperationSpecifications });
  // },
  // async cooperationProgress({ commit }, { page, limit }) {
  //   const { data: cooperationProgress } = await API.cooperationProgress({
  //     page,
  //     limit,
  //   });
  //   commit('changeCooperationProgress', { cooperationProgress });
  // },
  // async cooperationDocumentsFoundation({ commit }, { page, limit }) {
  //   const { data: agency } = await API.cooperationDocumentsFoundation({
  //     page,
  //     limit,
  //   });
  //   commit('changeCooperationDocumentsFoundation', { cooperationDocumentsFoundation });
  // },
  // async cooperationAgrees({ commit }, { page, limit }) {
  //   const { data: agency } = await API.cooperationAgrees({
  //     page,
  //     limit,
  //   });
  //   commit('changeCooperationAgrees', { cooperationAgrees });
  // },
  // // пример action для добавленияm сущности, везде префикс add_
  // add_request({ commit }, { form }) {
  //   return API.requestCreate({ form });
  // },
  // add_document({ commit }, { form }) {
  //   return API.documentCreate({ form });
  // },
  // add_estimatedPrice({ commit }, { form }) {
  //   return API.estimatedPriceCreate({ form });
  // },
  // add_specification({ commit }, { form }) {
  //   return API.specificationCreate({ form });
  // },
  // add_agree({ commit }, { form }) {
  //   return API.agreeCreate({ form });
  // },
  // add_workType({ commit }, { form }) {
  //   return API.workTypeCreate({ form });
  // },
  // add_workName({ commit }, { form }) {
  //   return API.workNameCreate({ form });
  // },
  // add_govCustomers({ commit }, { form }) {
  //   return API.govCustomersCreate({ form });
  // },
  // add_subcontractor({ commit }, { form }) {
  //   return API.subcontractorCreate({ form });
  // },
  // add_recipient({ commit }, { form }) {
  //   return API.recipientCreate({ form });
  // },
  // add_helicopter({ commit }, { form }) {
  //   return API.helicopterCreate({ form });
  // },
  // add_statusContract({ commit }, { form }) {
  //   return API.statusContractCreate({ form });
  // },
  // add_statusSupply({ commit }, { form }) {
  //   return API.statusSupplyCreate({ form });
  // },
  // add_statusSpecification({ commit }, { form }) {
  //   return API.statusSpecificationCreate({ form });
  // },
  // add_statusStage({ commit }, { form }) {
  //   return API.statusStageCreate({ form });
  // },

  // // пример action для обновления сущности, везде префикс update_
  // update_workType({ commit }, { id, form }) {
  //   return API.workTypeUpdate({ id, form });
  // },
  // update_workName({ commit }, { id, form }) {
  //   return API.workNameUpdate({ id, form });
  // },
  // update_govCustomers({ commit }, { id, form }) {
  //   return API.govCustomersUpdate({ id, form });
  // },
  // update_subcontractor({ commit }, { id, form }) {
  //   return API.subcontractorUpdate({ id, form });
  // },
  // update_recipient({ commit }, { id, form }) {
  //   return API.recipientUpdate({ id, form });
  // },
  // update_helicopter({ commit }, { id, form }) {
  //   return API.helicopterUpdate({ id, form });
  // },
  // update_cooperationWorks({ commit }, { id, form }) {
  //   return API.cooperationRequestsUpdate({ id, form });
  // },
  // update_cooperationRequests({ commit }, { id, form }) {
  //   return API.cooperationRequestsUpdate({ id, form });
  // },
  // update_cooperationSpecifications({ commit }, { id, form }) {
  //   return API.cooperationSpecificationsUpdate({ id, form });
  // },
  // update_cooperationProgress({ commit }, { id, form }) {
  //   return API.cooperationProgressUpdate({ id, form });
  // },
  // update_cooperationDocumentsFoundation({ commit }, { id, form }) {
  //   return API.cooperationDocumentsFoundationUpdate({ id, form });
  // },
  // update_cooperationAgrees({ commit }, { id, form }) {
  //   return API.cooperationAgreesUpdate({ id, form });
  // },
  // update_statusContract({ commit }, { id, form }) {
  //   return API.statusContractUpdate({ id, form });
  // },
  // update_statusSupply({ commit }, { id, form }) {
  //   return API.statusSupplyUpdate({ id, form });
  // },
  // update_statusSpecification({ commit }, { id, form }) {
  //   return API.statusSpecificationUpdate({ id, form });
  // },
  // update_statusStage({ commit }, { id, form }) {
  //   return API.statusStageUpdate({ id, form });
  // },
  // // автозаполнение select
  // form_workName({ commit }) {
  //   return API.workNameForm();
  // },
  // form_helicopter({ commit }) {
  //   return API.helicopterForm();
  // },
  // form_subcontractor({ commit }) {
  //   return API.subcontractorForm();
  // },
};
