export default {
  contract: {
    breadCrumb:'Реестр государственных контрактов',
    Contract: {
      title: 'Наименование',
      number: 'Номер гос. контракта',
      price: 'Цена',
      date: 'Дата контракта',
      deadline: 'Срок выполнения',
      specifications: 'Спецификации',
      stages: 'Объем финансирования',
      customer: 'Заказчик',
      prepaids: 'Предоплаты',
      supplies: 'Перечень работ',
      status: 'Статус',

    },
    Stage: {
      breadCrumb:'Перечень работ',
      status: 'Статус',
      year: 'Ориентировочная цена год',
      founding: 'Ориентировочная цена',
      contract: 'Гос. контракт',
      supplies: 'Перечень работ',
      specification: 'Спецификация',
      price: 'Стоимости работ этапа',
      rate: 'Ставки',
      vh: 'Собственная ставка',
      vat: 'НДС',
      costs: 'Собственные расходы, %',
      profit: 'Прибыль, %',
      profit_costs: 'Прибыль от собственных расходов, %',
    },
    Supply: {
      breadCrumb:'Перечень работ',
      contract: 'Гос. контракт',
      work: 'Наименование работ',
      workType: 'Вид работы',
      position: 'Позиция по перечню ГК',
      unit: 'Ед.Изм.',
      component: 'Номер изделия',
      helicopters: 'Тип ВТ',
      quantity: 'Объем работ',
      recipient: 'Получатель',
      standards: 'НТД',
      specialist: 'Ответственный',
      subcontractor: 'Исполнитель',

      filter: {
        helicopters: 'Тип ВТ',
        workTypes: 'Вид работы',
        recipients: 'Получатель',
      }
    },
    Adjustment: {
      breadCrumb:'Перечень работ',
      reason: 'Причина',
      date: 'Дата внесения',
      document: 'Документ',
    },
    Specialist: {
      breadCrumb:'Перечень работ',
      position: 'Позиция по перечню ГК',
      helicopters: 'Тип ВТ',
      workType: 'Вид работы',
      work: 'Наименование работ',
      quantity: 'Объем работ',
      unit: 'Ед.изм.',
      recipient: 'Получатель',
      standards: 'НТД',
      specialist: 'Отвественный',

      filter: {
        helicopters: 'Тип ВТ',
        workTypes: 'Вид работы',
        specialists: 'Отвественный',
      }
    },
    Document: {
      breadCrumb:'Перечень работ',
      number: 'Номер',
      name: 'Наименование',
      date: 'Дата',
      files: 'Файлы',

      filter: {
        date: 'Дата',
        number: 'Номер',
      }
    },
    Agreement: {
      breadCrumb:'Перечень работ',
      contract: 'Гос. контракт',
      work: 'Наименование работ',
      workType: 'Вид работы',
      position: 'Позиция по перечню ГК',
      unit: 'Ед.Изм.',
      component: 'Номер изделия',
      helicopters: 'Тип ВТ',
      quantity: 'Объем работ',
      recipient: 'Получатель',
      standards: 'НТД',
      specialist: 'Ответственный',
      subcontractor: 'Исполнитель',

      filter: {
        helicopters: 'Тип ВТ',
        workTypes: 'Вид работы',
        recipients: 'Получатель',
      }
    },
    Specification: {
      breadCrumb:'Спецификация',
    },
    Cooperation: {
      breadCrumb:'Кооперация',
    },
    Prepaid: {},
    Endpoint: {
      supply: { header: 'Таблица формирования перечня работ' },
      io: { header: 'Таблица импорт перечня' },
      specialist: { header: 'Таблица распределение работ' },
      agreement: { header: 'Таблица согласование перечня' },
      adjustment: { header: 'Таблица корректировки перечня' },
      document: { header: 'Таблица Сопроводительных документов' },
    },
  },

  catalog: {
    breadCrumb:'Справочники',
    StatusContract: {
      breadCrumb:'Статусы контрактов',
      header: 'Справочник статусов контрактов',
      id: 'ID',
      name: 'Наименование',
    },
    StatusSupply: {
      breadCrumb: 'Статусы работ',
      header: 'Справочник статусов работ',
      id: 'ID',
      name: 'Наименование',
    },
    StatusAdjustment: {
      breadCrumb: 'Статусы корректировок работ',
      header: 'Справочник статусов корректировок работ',
      id: 'ID',
      name: 'Наименование',
    },
    StatusStage: {
      breadCrumb: 'Статусы этапов',
      header: 'Справочник статусов этапов',
      id: 'ID',
      name: 'Наименование',
    },
    StatusSpecification: {
      breadCrumb: 'Статусы спецификаций',
      header: 'Справочник статусов спецификаций',
      id: 'ID',
      name: 'Наименование',
    },
    WorkName: {
      breadCrumb: 'Наименования работ',
      header: 'Справочник наименований работ',
      id: 'ID',
      name: 'Наименование работы',
      helicopter: 'Тип или модификация ВТ',
      workType: 'Вид или подвид работы',
    },
    WorkType: {
      breadCrumb: 'Наименования видов работ',
      header: 'Справочник наименований видов работ',
      number: 'Номер позиции в перечне ГК',
      'data.number': 'Номер позиции перечня ГК',
      type: 'Вид работы',
      name: 'Вид или Подвид работы',
    },
    Unit: {
      breadCrumb: 'Единиы измерений',
      header: 'Справочник единиц измерений',
      name: 'Наименование'
    },
    Standard: {
      breadCrumb: 'НТД',
      header: 'Справочник НТД',
      name: 'Наименование',
      symbol: 'Обозначение',
    },
    Helicopter: {
      breadCrumb: 'Вертолетная техника',
      header: 'Справочник вертолетной техники',
      name: 'Наименование',
      modifications: 'Модификация',
      type: 'Тип',
      number: '№ п/п',
      'data.number': 'Номер позиции перечня ГК',
    },
    Customer: {
      breadCrumb: 'Заказчики',
      'data.number': 'Номер позиции перечня ГК',
      header: 'Справочник заказчиков',
      name: 'Наименование заказчика',
      number: '№ п/п',
      'data.description': 'Полное наименование'
    },
    Component: {
      breadCrumb: 'Комплектующие изделия',
      header: 'Справочник комплектующих изделий',
      name: 'Наименование',
      symbol: 'Обозначение',
      number18675: 'Номер системы по ГОСТ 18675',
      standard18675: 'Номер системы по ГОСТ 18675',
      workType: 'Возможные виды работ',
      helicopters: 'Применимость',
      standards: 'НТД',
      'data.workType': 'Возможные виды работ',
      'data.helicopters': 'Применимость',
      'data.standards': 'НТД',
    },
    Subcontractor: {
      breadCrumb: 'Исполнители работ',
      header: 'Справочник исполнителей работ',
      name: 'Наименование исполнителя',
      agency: 'Наименование военного представительства',
      'data.workTypes': 'Виды работ',
      'data.agency': 'Военное представительство',
      'data.description': 'Полное наименование',
      'data.inn': 'ИНН',
      'data.kpp': 'КПП',
      'data.address.place': 'Адрес места нахождения',
      'data.address.post': 'Почтовый адрес',
      'data.certificate': 'Сертификат соответствия',

    },
    Recipient: {
      breadCrumb: 'Получатели работ',
      header: 'Справочник получателей работ',
      name: 'Наименование получателя',
    },
    Agency: {
      breadCrumb: 'Военные представительств',
      header: 'Справочник военных представительств',
      name: 'Наименование военного представительства',
      'data.description': 'Полное наименование'
    },
  },
  cooperation: {
    Supply: {
      number: 'Позиция по перечню ГК',
      helicopters: 'Тип ВТ',
      workType: 'Вид работы',
      work: 'Наименование работ',
      quantity: 'Объем работ',
      unit: 'Ед.Изм.',
      recipient: 'Получатель',
      standarts: 'НТД',
      subcontractor: 'Исполнитель',
    },
    Requests: {
      name: 'Номер п/п',
      subcontractor: 'Исполнитель',
      numberIn: '№ исх.',
      sendDate: 'Дата отправки',
      receiptDate: 'Дата получения (план)',
      numberOut: '№ вх.',
      receiptDateFact: 'Дата получения (факт)',
      transferDate: 'Дата передачи в УЦО',
      file: 'Файл',
    },
    Prices: {
      name: 'Номер п/п',
      title: 'Наименование',
      number: 'Номер',
      date: 'Дата',
    },
    Specifications: {
      number: 'Позиция по перечню ГК',
      helicopters: 'Тип ВТ',
      work: 'Наименование работ',
      quantity: 'Объем работ',
      unit: 'Ед.Изм.',
      price: 'Цена за ед. (руб.) с НДС',
      total: 'Сумма за ед. (руб.) с НДС',
      deadline: 'Срок выполнения работ',
      recipient: 'Получатель',
      standarts: 'НТД',
      reportDocuments: {
        name: 'Номер п/п',
        title: 'Наименование',
        number: 'Номер',
        receiptDate: 'Дата поступления',
        signingDate: 'Дата подписания',
        status: 'Наличие оригинала'
      }
    },
    Progress: {
      number: 'Позиция по перечню ГК',
      helicopters: 'Тип ВТ',
      work: 'Наименование работ',
      quantity: 'Объем работ',
      unit: 'Ед.Изм.',
      price: 'Цена за ед. (руб.) с НДС',
      total: 'Сумма за ед. (руб.) с НДС',
      deadline: 'Срок выполнения работ',
      recipient: 'Получатель',
      standarts: 'НТД',
    },
    DocumentsFoundation: {
      name: 'Номер п/п',
      title: 'Наименование',
      number: 'Номер',
      date: 'Дата',
      recipient: 'Получатель',
      standarts: 'НТД',
      subcontractor: 'Исполнитель',
      status: 'Наличие оригинала'
    },
  },

  common: {
    User: {
      surname: 'Фамилия',
      name: 'Имя',
      patronymic: 'Отчество',
      email: 'Email',
      phone: 'Номер телефона',
      role: 'Роль',
    },
    Role: {
      name: '',
    },
    Resource: {
      name: '',
    },
    Action: {
      name: '',
    },
    File: {},
  },

  report: {},
  bpmn: {},

  breadcrumbs: {
    'contract': {
      '/contracts': 'Реестр сервисных контрактов',
      '/contract/10': 'Контракт', // id или number
      '/contract/10/works/list': 'Перечень работ',
      '/contract/10/works/distribution': 'Распределение работ',
      '/contract/10/works/agree': 'Согласование перечня',
      '/contract/10/works/corrects': 'Корерктировки',
      '/contract/10/works/docs': 'Сопроводительные документы',
      '/contract/10/cooperations': 'Кооперация',
      '/contract/10/specifications': 'Спецификации',
      '/contract/10/agrees': 'Дополнительныые соглашения',
      '/contract/10/settles': 'Взаиморасчеты',
      '/contract/10/documents': 'Сопроводительные документы',
      '/contract/10/progress': 'Ход исполнения',
    },
    'catalog': {
      '/catalog': 'Справочники',
      '/catalog/work-names': 'Справочник наименований работ',
      '/catalog/work-types': 'Справочник видов и подвидов работ',
      '/catalog/gov-customers': 'Справочник государственных заказчиков',
      '/catalog/subcontractor': 'Справочник исполнителей',
      '/catalog/recipients': 'Справочник получателей',
      '/catalog/helicopter': 'Справочник типов и модификаций вертолетной техники',
      '/catalog/control-points': 'Контрольные точки',
      '/catalog/component': 'Справочник комплектующих изделий',
      '/catalog/units': 'Справочник единиц измерения',
      '/catalog/status-contract': 'Справочник статусов контрактов',
      '/catalog/status-supply': 'Справочник статусов перечня работ',
      '/catalog/status-stage': 'Справочник статусов этапов',
      '/catalog/status-adjustment': 'Справочник корректировок работ',
      '/catalog/status-specification': 'Справочник спецификаций',
      '/catalog/performers-prices': 'Прайс-листы исполнителей',
      '/catalog/catalog-standarts': 'НТД',
      '/catalog/agency': 'Справочник военных представительств',
    }
  }
};
