import API from './../api'

export default {
  async getContractsList({ commit }, { page, limit, filter }) {
    const { data: contracts } = await API.getContractsList({ page, limit, filter });

    commit('changeContractsData', {
      contracts
    })
  },
  async getContract({ commit }) {
    const { data } = await API.getContract();

  },
  async changeContractStatus({ commit }) {
    const { data } = await API.changeContractStatus();
  },
  сontractForm({ commit }, { id }) {
    return API.contractForm({ id });
  },
  updateContract({ commit }, { form, id }) {
    return API.updateContract({ form, id });
  },
  createContract({ dispatch, commit }, { form }) {
    return API.createContract({ form });
  },
  async fetchContractWorks({ commit }, params) {
    const { data: contractWorks } = await API.getSupply(params);
    commit('changeContractWorks', {
      contractWorks
    })
  },
  getContractWorkById({ commit }, params) {
    return API.getSupply(params);
  },
  getSupplyForm({ commit }, { contractId, supplyId }) {
    return API.getSupplyForm({ contractId, supplyId });
  },
  getSupplyStandart({ commit }, { id }) { // +
    return API.getSupplyStandart({ id });

  },
  getSupplyRecipient({ commit }, { id }) {
    return API.getSupplyRecipient({ id });

  },
  getSupplyWork({ commit }, { id }) {
    return API.getSupplyWork({ id });

  },
  getSupplyAdjustments({ commit }, { contractId, supplyId }) {
    return API.getSupplyAdjustments({ contractId, supplyId });
  },
  createContractWork({ dispatch, commit }, { form, contract }) {
    return API.createSupply({
      form,
      contract
    });
  },
  updateContractWork({ dispatch, commit }, { id, form, contract }) {
    return API.updateSupply({ id, form, contract });
  },
  async supplyIoIndex({ commit }) {
    const { data } = await API.supplyIoIndex();

  },
  exportSupply({ commit }, { id, filter }) {
    return API.exportSupply({ id, filter });
  },
  async importSupply({ commit }) {
    const { data } = await API.importSupply();

  },
  async getSpecialists({ commit }, params) {
    const { data: specialists } = await API.getSpecialists( params);
    commit('changeSpecialists', {
      specialists
    })
  },

  async getSpecialistForm({ commit }, { id }) {
    const { data: { data: specialistsList }  } = await API.getSpecialistForm({ id });
    commit('changeSpecialistsList', {
      specialistsList
    })
  },

  updateSpecialist({ commit }, {supplies, specialist, contractId}) {
    return API.updateSpecialist({supplies, specialist, contractId});
  },
  async getAgreement({ commit }, params) {
    const { data: agreement } = await API.getAgreement(params);
    commit('changeAgreement', {
      agreement
    })

  },
  changeAgreementStatus({ commit }, data) {
    return API.changeAgreementStatus(data);

  },
  async getAdjustments({ commit }, params ) {
    const { data: adjustments } = await API.getAdjustment(params);
    commit('changeAdjustments', {
      adjustments
    })
  },
  createAdjustment({ commit }, { contractId, supplyId, form }) {
    return API.createAdjustment({ contractId, supplyId, form });

  },
  changeAdjustmentForm({ commit }, { contractId, supplyId }) {
    return API.changeAdjustmentForm({ contractId, supplyId });

  },
  async viewAdjustment({ commit }) {
    const { data } = await API.viewAdjustment();

  },
  async changeAdjustmentStatus({ commit }) {
    const { data } = await API.changeAdjustmentStatus();

  },
  async getDocuments({ commit }, params ) {
    const { data: documents } = await API.getDocuments(params);
    commit('changeDocuments', {
      documents
    })

  },
  async changedDocumentForm({ commit }) {
    const { data } = await API.changedDocumentForm();

  },
  async createDocument({ commit }) {
    const { data } = await API.createDocument();

  },
  async updateDocument({ commit }) {
    const { data } = await API.updateDocument();

  },
  uploadFile({ commit }, form) {
    return API.uploadDocumentFile(form);
  },
  uploadDocumentFile({ commit }, { form, contractId }) {
    return API.uploadDocumentFile({ form, contractId });
  },
  async deleteDocumentFile({ commit }) {
    const { data } = await API.deleteDocumentFile();

  },
  async getSubcontractor({ commit }) {
    const { data } = await API.getSubcontractor();

  },
  async changeSubcontractorForm({ commit }) {
    const { data } = await API.changeSubcontractorForm();

  },
  async appointmentSubcontractor({ commit }) {
    const { data } = await API.appointmentSubcontractor();

  },
  async changeSubcontractorRequestForm({ commit }) {
    const { data } = await API.changeSubcontractorRequestForm();

  },
  async createSubcontractorRequest({ commit }) {
    const { data } = await API.createSubcontractorRequest();

  },
  async updateSubcontractorRequest({ commit }) {
    const { data } = await API.updateSubcontractorRequest();

  },
  async getSupplyPrice({ commit }) {
    const { data } = await API.getSupplyPrice();

  },
}
