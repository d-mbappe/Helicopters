import API from './../api';

export default {
  // асинхронная функция - экшн
  async workType({ commit }, form) {
    // которая делает запрос и дальше не идёт пока промис не вернёт resolve с ответом
    const { data: workType } = await API.workType(form); // то же что и:
    // const response = await API.workType({ page });
    // const data = response.data; // но тут надо смотреть что отдаёт бек
    // const workType = data;
    //в результате получаем тот же workType с теми же данными
    // и отправляем в mutation
    commit('changeWorkType', { workType });
  },
  async workName({ commit }, form) {
    const { data: workName } = await API.workName(form);
    commit('changeWorkName', { workName });
  },
  async workNameRevisions({ commit }, {id, type}) {
    const { data: currentRevision } = await API.workNameRevisions(id, type);
    commit('changeCurrentRevision', { currentRevision });

  },
  async govCustomers({ commit }, form) {
    const { data: govCustomers } = await API.govCustomers(form);
    commit('changeGovCustomers', { govCustomers });
  },
  async subcontractor({ commit }, form) {
    const { data: subcontractor } = await API.subcontractor(form);
    commit('changeSubcontractor', { subcontractor });
  },
  async recipient({ commit }, { page, limit, q }) {
    const { data: recipient } = await API.recipient({ page, limit, q });
    commit('changeRecipient', { recipient });
  },
  async helicopter({ commit }, form) {
    const { data: helicopter } = await API.helicopter(form);
    commit('changeHelicopter', { helicopter } );
  },
  getHelicopterById({ commit }, { number }) {
    return API.helicopter({ page: 1, limit: 1, type: null, agreed: true, filter: { number: number }});
  },
  getWorkById({ commit }, { id }) {
    return API.workType({ page: 1, limit: 1, filter: { number: id} });
  },
  getSubWorkById({ commit }, { id }) {
    //filter: { number: <integer>, type: <integer>, agreed: true }
    return API.workType({ page: 1, limit: 1, filter: { number: id, type: id} });
  },
  async catalogComponents({ commit }, form) {
    const { data: catalogComponents } = await API.catalogComponents(form);
    commit('changeCatalogComponents', { catalogComponents });
  },
  async catalogUnits({ commit }, form) {
    const { data: catalogUnits } = await API.catalogUnits(form);
    commit('changeCatalogUnits', { catalogUnits });
  },
  async catalogContract({ commit }, form) {
    const { data: catalogContract } = await API.catalogContract(form);
    commit('changeCatalogContract', { catalogContract });
  },
  async statusContract({ commit }, form) {
    const { data: statusContract } = await API.statusContract(form);
    commit('changeStatusContract', { statusContract });
  },
  async statusSupply({ commit }, form) {
    const { data: statusSupply } = await API.statusSupply(form);
    commit('changeStatusSupply', { statusSupply });
  },
  async statusStage({ commit }, form) {
    const { data: statusStage } = await API.statusStage(form);
    commit('changeStatusStage', { statusStage });
  },
  async statusSpecification({ commit }, form) {
    const { data: statusSpecification } = await API.statusSpecification(form);
    commit('changeStatusSpecification', { statusSpecification });
  },
  async catalogStandarts({ commit }, form) {
    const { data: catalogStandarts } = await API.catalogStandarts(form);
    commit('changeCatalogStandarts', { catalogStandarts });
  },
  async statusAdjustment({ commit }, form) {
    const { data: statusAdjustment } = await API.statusAdjustment(form);
    commit('changeStatusAdjustment', { statusAdjustment });
  },
  async agency({ commit }, form) {
    const { data: agency } = await API.agency(form);
    commit('changeAgency', { agency });
  },
  async controlPoints({ commit }, form) {
    const { data: controlPoints } = await API.controlPoints(form);
    commit('changeControlPoints', { controlPoints });
  },
  // пример action для добавленияm сущности, везде префикс add_
  add_workType({ commit }, form) {
    return API.workTypeCreate(form);
  },
  add_workName({ commit }, form) {
    return API.workNameCreate(form);
  },
  add_govCustomers({ commit }, form) {
    return API.govCustomersCreate(form);
  },
  add_subcontractor({ commit }, form) {
    return API.subcontractorCreate(form);
  },
  add_recipient({ commit }, form) {
    return API.recipientCreate(form);
  },
  add_helicopter({ commit }, form) {
    return API.helicopterCreate(form);
  },
  add_catalogUnits({ commit }, form) {
    return API.catalogUnitsCreate(form);
  },
  add_catalogComponents({ commit }, form) {
    return API.catalogComponentsCreate(form);
  },
  add_catalogStandarts({ commit }, form) {
    return API.catalogStandartsCreate(form);
  },
  add_statusContract({ commit }, form) {
    return API.statusContractCreate(form);
  },
  add_statusSupply({ commit }, form) {
    return API.statusSupplyCreate(form);
  },
  add_statusSpecification({ commit }, form) {
    return API.statusSpecificationCreate(form);
  },
  add_statusStage({ commit }, form) {
    return API.statusStageCreate(form);
  },
  add_statusAdjustment({ commit }, form) {
    return API.statusAdjustmentCreate(form);
  },
  add_agency({ commit }, form) {
    return API.agencyCreate(form);
  },
  add_controlPoints({ commit }, { id,form }) {
    return API.controlPointsCreate({ id,form });
  },

  // пример action для обновления сущности, везде префикс update_
  update_workType({ commit }, { id, form }) {
    return API.workTypeUpdate({ id, form });
  },
  update_workName({ commit }, { id, form }) {
    return API.workNameUpdate({ id, form });
  },
  update_govCustomers({ commit }, { id, form }) {
    return API.govCustomersUpdate({ id, form });
  },
  update_subcontractor({ commit }, { id, form }) {
    return API.subcontractorUpdate({ id, form });
  },
  update_recipient({ commit }, { id, form }) {
    return API.recipientUpdate({ id, form });
  },
  update_helicopter({ commit }, { id, form }) {
    return API.helicopterUpdate({ id, form });
  },
  update_catalogUnits({ commit }, { id, form }) {
    return API.catalogUnitsUpdate({ id, form });
  },
  update_catalogComponents({ commit }, { id, form }) {
    return API.catalogComponentsUpdate({ id, form });
  },
  update_catalogStandarts({ commit }, { id, form }) {
    return API.catalogStandartsUpdate({ id, form });
  },
  update_statusContract({ commit }, { id, form }) {
    return API.statusContractUpdate({ id, form });
  },
  update_statusSupply({ commit }, { id, form }) {
    return API.statusSupplyUpdate({ id, form });
  },
  update_statusSpecification({ commit }, { id, form }) {
    return API.statusSpecificationUpdate({ id, form });
  },
  update_statusStage({ commit }, { id, form }) {
    return API.statusStageUpdate({ id, form });
  },
  update_statusAdjustment({ commit }, { id, form }) {
    return API.statusAdjustmentUpdate({ id, form });
  },
  update_agency({ commit }, { id, form }) {
    return API.agencyUpdate({ id, form });
  },
  update_controlPoints({ commit }, { id, form }) {
    return API.controlPointsUpdate({ id, form });
  },
  // автозаполнение select
  form_workName({ commit }) {
    return API.workNameForm();
  },
  // автозаполнение select
  form_workType({ commit }) {
    return API.workTypeForm();
  },
  form_catalogComponents({ commit }) {
    return API.catalogComponentsForm();
  },
  form_helicopter({ commit }) {
    return API.helicopterForm();
  },
  form_subcontractor({ commit }) {
    return API.subcontractorForm();
  },
  form_controlPoints({ commit }) {
    return API.controlPointsForm();
  },
  form_workTypeForm({commit}) {
    return API.workTypeForm();
  }
};
