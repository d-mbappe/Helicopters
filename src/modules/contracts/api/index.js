import api from '@/utils/api'

const getContractsList = ({ page, limit, filter }) => //+
  api({
    method: 'get',
    url: `/api/v1/contract`,
    params: {
      page,
      limit,
      filter
    }
  })

const getContract = ({ id }) =>
  api({
    method: 'get',
    url: `/api/v1/contract/${id}`,
  })

const changeContractStatus = data =>
  api({
    method: 'post',
    url: `/api/v1/contract`,
    data: {
      method: 'status',
    }
  })

const contractForm = ({ id }) => {
  return api({
    method: 'get',
    url: `/api/v1/contract/form`,
    params: {
      id
    }
  })
}

const updateContract = ({ form, id }) =>
  api({
    method: 'patch',
    url: `/api/v1/contract/${id}`,
    data: {
      ...form
    }
  })

const createContract = ({ form }) => // +
  api({
    method: 'post',
    url: `/api/v1/contract`,
    data: {
      ...form
    }
  })

const getSupply = (params) =>
  api({
    method: 'get',
    url: `/api/v1/contract/${params.id}/supply`,
    params: {
      ...params
    }
  })

const getSupplyForm = ({ contractId, supplyId }) => {
  return api({
    method: 'get',
    url: `/api/v1/contract/${contractId}/supply/form`,
    params: {
      supplyId
    }
  })
}

const getSupplyStandart = ({ id }) =>
  api({
    method: 'get',
    url: `/api/v1/contract/standart`,
    params: {
      id
    }
  })

const getSupplyRecipient = ({ id, q }) =>
  api({
    method: 'get',
    url: `/api/v1/contract/recipient`,
    params: {
      id,
      q: q
    },
  })

const getSupplyWork = ({ id }) =>
  api({
    method: 'get',
    url: `/api/v1/contract/work`,
    params: {
      id,
    }
  })

const getSupplyAdjustments = ({ contractId , supplyId }) =>
  api({
    method: 'get',
    url: `/api/v1/contract/${contractId}/supply/${supplyId}/adjustment`,
  })

const createSupply = ({ form, contract }) =>
  api({
    method: 'post',
    url: `/api/v1/contract/supply`,
    data: {
      ...form,
      components: [1],
      contract: contract,
    }
  })

const updateSupply = ({ id, form, contract }) =>
  api({
    method: 'patch',
    url: `/api/v1/contract/supply/${id}`,
    data: {
      ...form,
      components: [1],
      contract: contract,
    }
  })

const supplyIoIndex = data =>
  api({
    method: 'post', //?
    url: `/api/v1/contract/supply/io`,
    data: {
      method: 'index',
    }
  })

const exportSupply = ({ id, filter }) =>
  api({
    method: 'post',
    url: `/api/v1/contract/${id}/supply/export`,
    data: {
      filter
    }
  })

const importSupply = data =>
  api({
    method: 'post', //?
    url: `/api/v1/contract/supply/io`,
    data: {
      method: 'import',
    }
  })

const getSpecialists = (params) => //+
  api({
    method: 'get',
    url: `/api/v1/contract/${params.id}/supply/specialist`,
    params: {
      ...params
    }
  })

const getSpecialistForm = ({id}) =>
  api({
    method: 'get',
    url: `/api/v1/contract/${id}/supply/specialist/form`,
  })

const updateSpecialist = ({supplies, specialist, contractId}) =>
  api({
    method: 'patch',
    url: `/api/v1/contract/${contractId}/supply/specialist`,
    data: {
      supplies,
      specialist
    }
  })

const getAgreement = (params) => //+
  api({
    method: 'get',
    url: `/api/v1/contract/${params.id}/supply/agreement`,
    params: {
      ...params
    }
  })

const changeAgreementStatus = data =>
  api({
    method: 'PATCH',
    url: `/api/v1/contract/${data.contract}/supply/agreement`,
    data
  })

const getAdjustment = (params) =>
  api({
    method: 'get',
    url: `/api/v1/contract/${params.id}/supply/adjustment`,
    params: {
      ...params
      // page,
      // limit,
    }
  })

const changeAdjustmentForm = ({contractId, supplyId}) =>
  api({
    method: 'get',
    url: `/api/v1/contract/${contractId}/supply/${supplyId}/adjustment/form`,
  })

const createAdjustment = ({ contractId, supplyId, form }) =>
  api({
    method: 'post',
    url: `/api/v1/contract/${contractId}/supply/${supplyId}/adjustment`,
    data: {
      ...form
    }
  })

const viewAdjustment = data =>
  api({
    method: 'get',
    url: `/api/v1/contract/supply/adjustment`,
    params: {
      method: 'view',
    }
  })

const changeAdjustmentStatus = data =>
  api({
    method: 'post',
    url: `/api/v1/contract/supply/adjustment`,
    params: {
      method: 'status',
    }
  })

const getDocuments = (params) =>
  api({
    method: 'get',
    url: `/api/v1/contract/${params.id}/document`,
    params: {
      ...params
    }
  })

const changedDocumentForm = data =>
  api({
    method: 'get',
    url: `/api/v1/contract/document`,
    params: {
      method: 'form',
    }
  })

const createDocument = data =>
  api({
    method: 'post',
    url: `/api/v1/contract/document`,
    params: {
      method: 'create',
    }
  })

const updateDocument = data =>
  api({
    method: 'post',
    url: `/api/v1/contract/document`,
    params: {
      method: 'create',
    }
  })

const uploadFile = form =>
  api({
    method: 'post',
    url: `/api/v1/common/file`,
    data: form,
  })

const uploadDocumentFile = ({ form, contractId }) =>
  api({
    method: 'post',
    url: `/api/v1/contract/${contractId}/document/`,
    data: form,
  })

const deleteDocumentFile = data =>
  api({
    method: 'post',
    url: `/api/v1/common/file`,
    params: {
      method: 'delete',
    }
  })

const getSubcontractor = data =>
  api({
    method: 'get',
    url: `/api/v1/contract/supply/subcontractor`,
    params: {
      method: 'index',
    }
  })

const changeSubcontractorForm = data =>
  api({
    method: 'get',
    url: `/api/v1/contract/supply/subcontractor`,
    params: {
      method: 'form',
    }
  })

const appointmentSubcontractor = data =>
  api({
    method: 'post',
    url: `/api/v1/contract/supply/subcontractor`,
    params: {
      method: 'appointment',
    }
  })

const changeSubcontractorRequestForm = data =>
  api({
    method: 'get',
    url: `/api/v1/contract/supply/subcontractor/request`,
    params: {
      method: 'form',
    }
  })

const createSubcontractorRequest = data =>
  api({
    method: 'post',
    url: `/api/v1/contract/supply/subcontractor/request`,
    params: {
      method: 'create',
    }
  })

const updateSubcontractorRequest = data =>
  api({
    method: 'post',
    url: `/api/v1/contract/supply/subcontractor/request`,
    params: {
      method: 'update',
    }
  })

const getSupplyPrice = data =>
  api({
    method: 'post',
    url: `/api/v1/contract/supply/price`,
    params: {
      method: 'index',
    }
  })

const API = {
  getContractsList,
  getContract,
  changeContractStatus,
  contractForm,
  updateContract,
  createContract,

  getSupply,
  getSupplyForm,
  getSupplyStandart,
  getSupplyRecipient,
  getSupplyWork,
  getSupplyAdjustments,
  createSupply,
  updateSupply,

  supplyIoIndex,
  exportSupply,
  importSupply,

  getSpecialists,
  getSpecialistForm,
  updateSpecialist,

  getAgreement,
  changeAgreementStatus,

  getAdjustment,
  changeAdjustmentForm,
  createAdjustment,
  viewAdjustment,
  changeAdjustmentStatus,

  getDocuments,
  changedDocumentForm,
  createDocument,
  updateDocument,
  uploadFile,
  uploadDocumentFile,
  deleteDocumentFile,

  getSubcontractor,
  changeSubcontractorForm,
  appointmentSubcontractor,
  changeSubcontractorRequestForm,
  createSubcontractorRequest,
  updateSubcontractorRequest,

  getSupplyPrice,
}

export default API
