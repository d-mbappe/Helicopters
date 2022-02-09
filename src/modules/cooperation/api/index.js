import api from '@/utils/api';

// Статусы контрактов
// index

const statusContract = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-contract',
    params: {
      // тут смотрим по докам api , params могут быть разные
      ...form
    },
  });

// form

const statusContractForm = () =>
  api({
    method: 'get',
    url: 'api/v1/catalog/status-contract/form',
  });

// update

const statusContractUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/status-contract/${id}`,
    data: {
      ...form
    },
  });

// agree

const statusContractAgree = (id) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/status-contract/${id}/agree`,
  });

// create

const statusContractCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/status-contract',
    data: {
      ...form
    },
  });

// import

const statusContractImport = ({ filename }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/status-contract/import',
    data: {
      filename,
    },
  });

//  export

const statusContractExport = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-contract/export',
  });

// search

const statusContractSearch = (q) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-contract',
    params: {
      q: q,
    },
  });

// revisions

const statusContractRevisions = (id) =>
  api({
    method: 'get',
    url: `/api/v1/catalog/status-contract/${id}/revisions`,
  });

// Статусы работ в перечне

// index

const statusSupply = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status_supply',
    params: {
      ...form
    },
  });

// form

const statusSupplyForm = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status_supply/form',
  });

// agree

const statusSupplyAgree = (id) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/status_supply/${id}/agree`,
    data: {
      id,
    },
  });

// update

const statusSupplyUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/status_supply/${id}`,
    data: {
      ...form
    },
  });

// create

const statusSupplyCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/status_supply',
    data: {
      ...form
    },
  });

// import

const statusSupplyImport = ({ filename }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/status_supply/import',
    data: {
      filename,
    },
  });

// export

const statusSupplyExport = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status_supply/export',
  });

// search

const statusSupplySearch = (data) =>
  api({
    method: 'get',
    url: 'api/v1/catalog/status_supply/search',
    params: {
      ...data
    },
  });

// revisions

const statusSupplyRevisions = (id) =>
  api({
    method: 'get',
    url: `/api/v1/catalog/status_supply/${id}/revisions`,
  });

// Статусы спецификаций
// index

const statusSpecification = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-specification',
    params: {
      ...form
    },
  });

// form

const statusSpecificationForm = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-specification/form',
  });

// agree

const statusSpecificationAgree = ({ id }) =>
  api({
    method: 'patch',
    url: '/api/v1/catalog/status-specification/agree',
    data: {
      id,
    },
  });

// update

const statusSpecificationUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/status-specification/${id}`,
    data: {
      ...form
    },
  });

// create

const statusSpecificationCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/status-specification',
    data: {
      ...form
    },
  });

// import

const statusSpecificationImport = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/status-specification',
    data: {
      ...form,
    },
  });

// export

const statusSpecificationExport = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-specification',
    params: {
      method: 'export',
      agreed: true,
    },
  });

// search

const statusSpecificationSearch = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-specification/search',
    params: {
      ...data
    },
  });

// revisions

const statusSpecificationRevisions = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-specification/revisions',
    params: {
      ...data
    },
  });

// Статусы этапов
// index

const statusStage = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-stage',
    params: {
      ...form
    },
  });

//form

const statusStageForm = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-stage/form',
  });

// agree

const statusStageAgree = (id) =>
  api({
    method: 'patch',
    url: '/api/v1/catalog/status-stage/agree',
    data: {
      id: id,
    },
  });

// update

const statusStageUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/status-stage/${id}`,
    data: {
      ...form
    },
  });

// create

const statusStageCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/status-stage',
    data: {
      ...form
    },
  });

// import

const statusStageImport = (data) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/status-stage',
    data: {
      method: 'import',
    },
  });

// export

const statusStageExport = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-stage',
    params: {
      method: 'export',
    },
  });

// search

const statusStageSearch = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-stage',
    params: {
      q: data,
      limit: 50,
      agreed: true,
    },
  });

// revisions

const statusStageRevisions = (id) => ({
  method: 'get',
  url: '/api/v1/catalog/status-stage',
  params: {
    id: id,
  },
});

// Статусы корректировок

// Наименования работ
// index

const workName = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/work-name',
    params: {
      ...form
    },
  });

// form

const workNameForm = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/work-name/form',
  });

// update

const workNameUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/work-name/${id}`,
    data: {
      ...form
    },
  });

// agree

const workNameAgree = (id) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/work-name/agree',
    params: {
      id: id,
    },
  });

// create

const workNameCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/work-name',
    data: {
      ...form
    },
  });

// import

const workNameImport = (filename) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/work-name',
    data: {
      method: 'import',
      filename: filename,
    },
  });

// export

const workNameExport = (data) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/work-name',
    params: {
      method: 'export',
      agreed: true,
    },
  });

// search

const workNameSearch = (q) =>
  api({
    method: 'get',
    url: 'api/v1/catalog/work-name/search',
    data: {
      q: q,
      limit: 50,
      agreed: true,
    },
  });

// revisions

const workNameRevisions = (id) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/work-name/revisions',
    params: {
      id: id,
    },
  });

// Виды работ

// index

const workType = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/work-type',
    params: {
      ...form
    },
  });

// form

const workTypeForm = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/work-type/form',
  });

// agree

const workTypeAgree = (id) =>
  api({
    method: 'patch',
    url: '/api/v1/catalog/work-type/agree',
    data: {
      id: id,
    },
  });

// update

const workTypeUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/work-type/${id}`,
    data: {
      ...form
    }
  });

// create

const workTypeCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/work-type',
    data: {
      ...form
    }
  });

// import

const workTypeImport = (filename) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/work-type',
    data: {
      method: 'import',
      filename: filename,
    },
  });

// export

const workTypeExport = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/work-type',
    params: {
      method: 'export',
      agreed: true,
    },
  });

// search

const workTypeSearch = (q) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/work-type/search',
    params: {
      q: q,
      limit: 50,
      agreed: true,
    },
  });

// revisions

const workTypeRevisions = (id) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/work-type/revisions',
    params: {
      id: 1,
    },
  });

// Получатели

// index

const recipient = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/recipient',
    params: {
      ...form
    },
  });

// form

const recipientForm = () =>
  api({
    method: 'get',
    url: 'api/v1/catalog/recipient/form',
  });

// agree

const recipientAgree = (id) =>
  api({
    method: 'patch',
    url: '/api/v1/catalog/recipient/agree',
    data: {
      id: id,
    },
  });

// update

const recipientUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/recipient/${id}`,
    data: {
      ...form
    },
  });

// create

const recipientCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/recipient',
    data: {
      ...form
    },
  });

// import

const recipientImport = (filename) => ({
  method: 'post',
  url: '/api/v1/catalog/recipient',
  params: {
    method: 'import',
    filename: filename,
  },
});

// export

const recipientExport = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/recipient',
    params: {},
  });

// search

const recipientSearch = (q) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/recipient/search',
    params: {
      q: q,
      limit: 50,
      agreed: true,
    },
  });

// revisions

const recipientRevisions = (id) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/recipient/revisions',
    params: {
      id: id,
    },
  });

// Государственные заказчики

// index

const govCustomers = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/customer',
    params: {
      ...form
    },
  });

// form

const govCustomersForm = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/customer/form',
  });

// agree

const govCustomersAgree = (id) =>
  api({
    method: 'patch',
    url: '/api/v1/catalog/customer/agree',
    data: {
      id: id,
    },
  });

// update

const govCustomersUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/customer/${id}`,
    data: {
      ...form,
    }
  });

// create

const govCustomersCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/customer',
    data: {
      ...form,
    }
  });

// import

const govCustomersImport = (filename) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/customer',
    params: {
      method: 'import',
      filename: filename,
    },
  });

// export

const govCustomersExport = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/customer',
    params: {
      method: 'export',
      agreed: true,
    },
  });

// search

const govCustomersSearch = (q) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/customer/search',
    params: {
      q: q,
      limit: 50,
      agreed: true,
    },
  });

// revisions

const govCustomersRevisions = (id) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/customer/revisions',
    params: {
      id: id,
    },
  });

// Исполнители/ВП

// index

const subcontractor = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/subcontractor',
    params: {
      ...form
    },
  });

// form

const subcontractorForm = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/subcontractor/form',
  });

// agree

const subcontractorAgree = (id) =>
  api({
    method: 'patch',
    url: '/api/v1/catalog/subcontractor/form/agree',
    params: {
      id
    },
  });

// update

const subcontractorUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/subcontractor/${id}`,
    data: {
      ...form
    }
  });

// create

const subcontractorCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/subcontractor',
    data: {
      ...form
    },
  });

// import

const subcontractorImport = (filename) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/subcontractor',
    params: {
      method: 'import',
      filename: filename,
    },
  });

// export

const subcontractorExport = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/subcontractor',
    params: {
      method: 'export',
      agreed: true,
    },
  });

// search

const subcontractorSearch = (q) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/subcontractor/search',
    params: {
      q: q,
      limit: 50,
      agreed: true,
    },
  });

// revisions

const subcontractorRevisions = (id) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/subcontractor/revisions',
    params: {
      id: id,
    },
  });

// Типы и модификации ВТ

// index

const helicopter = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/helicopter',
    params: {
      ...form
    },
  });

// form

const helicopterForm = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/helicopter/form',
  });

// agree

const helicopterAgree = (id) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/helicopter',
    params: {
      method: 'agree',
      id: id,
    },
  });

// update

const helicopterUpdate = ({ form, id }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/helicopter/${id}`,
    data: {
      ...form
    },
  });

// create

const helicopterCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/helicopter',
    data: {
      ...form
    },
  });

// import

const helicopterImport = (filename) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/helicopter',
    params: {
      method: 'import',
      filename: filename,
    },
  });

// export

const helicopterExport = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/helicopter',
    params: {
      method: 'export',
      agreed: true,
    },
  });

// search

const helicopterSearch = (q) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/helicopter',
    params: {
      method: 'search',
      q: q,
      limit: 50,
      agreed: true,
    },
  });

// revisions

const helicopterRevisions = (id) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/helicopter',
    params: {
      method: 'revisions',
      id: id,
    },
  });

// Контрольные точки

// КИ

// index

const catalogComponents = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/component',
    params: {
      ...form
    },
  });

// form

const catalogComponentsForm = () =>
  api({
    method: 'get',
    url: `/api/v1/catalog/component/form`,
  });

// agree

const catalogComponentsAgree = (id) => ({
  method: 'post',
  url: '/api/v1/catalog/component',
  params: {
    method: 'agree',
    id: id,
  },
});

// update

const catalogComponentsUpdate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/component',
    data: {
      ...form,
    },
  });

// create

const catalogComponentsCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/component',
    data: {
      ...form,
    },
  });

// import

const catalogComponentsImport = (filename) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/component',
    params: {
      method: 'import',
      filename: filename,
    },
  });

// export

const catalogComponentsExport = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/component',
    params: {
      method: 'export',
      agreed: true,
    },
  });

// search

const catalogComponentsSearch = (data) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/component',
    params: {
      method: 'search',
      limit: 50,
      agreed: true,
    },
  });

// revisions

const catalogComponentsRevisions = (id) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/component',
    params: {
      method: 'revisions',
      id: id,
    },
  });

// Единицы измерения

// index

const catalogUnits = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/unit',
    params: {
      ...form
    },
  });

// form

const catalogUnitsForm = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/unit/form',
  });

// update

const catalogUnitsUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/unit/${id}`,
    data: {
      ...form
    },
  });

// create

const catalogUnitsCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/unit',
    data: {
      ...form,
    },
  });

// Прайс-лист Исполнители

// НТД

// index

const catalogStandarts = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/standart',
    params: {
      ...form
    },
  });

// form

const catalogStandartsForm = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/standart/form',
  });

// update

const catalogStandartsUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/standart/${id}`,
    data: {
      ...form
    }
  });

// create

const catalogStandartsCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/standart',
    data: {
      ...form,
    }
  });

// Статусы корректировок
// index

const statusAdjustment = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-adjustment',
    params: {
      ...form
    },
  });

// form

const statusAdjustmentForm = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/status-adjustment/form',
  });

// update

const statusAdjustmentUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/status-adjustment/${id}`,
    data: {
      ...form
    },
  });

// create

const statusAdjustmentCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/status-adjustment',
    data: {
      ...form
    },
  });

// Agency

const agency = (form) =>
  api({
    method: 'get',
    url: '/api/v1/catalog/agency',
    params: {
      ...form
    },
  });

// form

const agencyForm = () =>
  api({
    method: 'get',
    url: '/api/v1/catalog/agency/form',
  });

// update

const agencyUpdate = ({ id, form }) =>
  api({
    method: 'patch',
    url: `/api/v1/catalog/agency/${id}`,
    data: {
      ...form,
    },
  });

// create

const agencyCreate = ({ form }) =>
  api({
    method: 'post',
    url: '/api/v1/catalog/agency',
    data: {
      ...form,
    },
  });

// import

const agencyImport = ({form}) => api({
  method: 'post',
  url: '/api/v1/catalog/agency/import',
  data: {
    ...form
  }
})

// Контрольные точки
// index

const controlPoints = () => api({
    method: 'get',
    url: '/api/v1/catalog/point',
});

// form
const controlPointsForm = () => api ({
  method: 'get',
  url: `/api/v1/catalog/point/form`,
});

// update
const controlPointsUpdate = ({id, form}) => api({
  method: 'patch',
  url: `/api/v1/catalog/point/${id}/form`,
  data: {
    ...form,
  }
});

// create
const controlPointsCreate = ({type, form}) => api({
  method: 'post',
  url: '/api/v1/catalog/point',
  data: {
    id: type,
    ...form,
  }
})

const API = {
  statusContract,
  statusContractForm,
  statusContractUpdate,
  statusContractAgree,
  statusContractCreate,
  statusContractImport,
  statusContractExport,
  statusContractSearch,
  statusContractRevisions,

  statusSupply,
  statusSupplyForm,
  statusSupplyAgree,
  statusSupplyUpdate,
  statusSupplyCreate,
  statusSupplyImport,
  statusSupplyExport,
  statusSupplySearch,
  statusSupplyRevisions,

  statusSpecification,
  statusSpecificationForm,
  statusSpecificationAgree,
  statusSpecificationUpdate,
  statusSpecificationCreate,
  statusSpecificationImport,
  statusSpecificationExport,
  statusSpecificationSearch,
  statusSpecificationRevisions,

  statusStage,
  statusStageForm,
  statusStageAgree,
  statusStageUpdate,
  statusStageCreate,
  statusStageImport,
  statusStageExport,
  statusStageSearch,
  statusStageRevisions,

  workName,
  workNameForm,
  workNameAgree,
  workNameUpdate,
  workNameCreate,
  workNameImport,
  workNameExport,
  workNameSearch,
  workNameRevisions,

  workType,
  workTypeForm,
  // workTypeFormCreate,
  workTypeCreate,
  workTypeAgree,
  workTypeUpdate,
  workTypeCreate,
  workTypeImport,
  workTypeExport,
  workTypeSearch,
  workTypeRevisions,

  recipient,
  recipientForm,
  recipientUpdate,
  recipientAgree,
  recipientCreate,
  recipientImport,
  recipientExport,
  recipientSearch,
  recipientRevisions,

  govCustomers,
  govCustomersForm,
  govCustomersUpdate,
  govCustomersAgree,
  govCustomersCreate,
  govCustomersImport,
  govCustomersExport,
  subcontractorSearch,
  govCustomersRevisions,

  subcontractor,
  subcontractorForm,
  subcontractorUpdate,
  subcontractorAgree,
  subcontractorCreate,
  subcontractorImport,
  subcontractorExport,
  subcontractorSearch,
  subcontractorRevisions,

  helicopter,
  helicopterForm,
  helicopterUpdate,
  helicopterAgree,
  helicopterCreate,
  helicopterImport,
  helicopterExport,
  helicopterSearch,
  helicopterRevisions,

  catalogUnits,
  catalogUnitsForm,
  catalogUnitsUpdate,
  catalogUnitsCreate,

  catalogComponents,
  catalogComponentsForm,
  catalogComponentsUpdate,
  catalogComponentsCreate,
  catalogComponentsImport,
  catalogComponentsExport,
  catalogComponentsSearch,
  catalogComponentsRevisions,

  catalogStandarts,
  catalogStandartsForm,
  catalogStandartsUpdate,
  catalogStandartsCreate,

  statusAdjustment,
  statusAdjustmentForm,
  statusAdjustmentUpdate,
  statusAdjustmentCreate,

  agency,
  agencyForm,
  agencyUpdate,
  agencyCreate,
  agencyImport,

  controlPoints,
  controlPointsForm,
  controlPointsUpdate,
  controlPointsCreate
};

export default API;
