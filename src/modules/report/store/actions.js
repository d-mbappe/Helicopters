import API from './../api';

export default {
  createContractWork({ dispatch, commit }, { form, contract }) {
    return API.createSupply({
      form,
      contract
    });
  }
}