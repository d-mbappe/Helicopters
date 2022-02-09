const [TEXT, SELECT, NUMBER, DATE] = ['text', 'select', 'number', 'date'];

export const config ={
  contract: {
    Contract: [

    ],
    Supply: {
      filters: [
        'helicopters',
        'workTypes',
        'recipients',
      ],
      formFields: [
        'components',
        'helicopters',
        'number',
        'quantity',
        'recipient',
        'standards',
        'unit',
        'work',
        'workType',
      ]
    },
    Specialist: {
      filters: [
        'helicopters',
        'workTypes',
        'specialists',
      ],
    },
    Agreement: {
      filters: [
        'helicopters',
        'workTypes',
        'recipients',
      ]
    },
    Corrects: {
      filters: [
        'helicopters',
        'workTypes',
        'recipients',
      ]
    },
    Document: {
      filters: [
        'date',
        'number',
      ]
    },
  },
  catalog: {
    'workType': {
      filterable: true,
      tableColumns: {
        number: {
          sortable: true
        },
        type: {
          sortable: true
        },
        name: {
          sortable: true
        },
      },
      formFields: {
        number: {
          type: TEXT,
          isFilterable: true,
        },
        type: {
          type: SELECT,
          multiSelect: false,
          groupNameSelectable: true,
          options: 'workTypes',
          isFilterable: true,
        },
        name: {
          type: TEXT,
        },
      },

    },
    'workName': {
      filterable: true,
      tableColumns: {
        workType: {
          sortable: true
        },
        name: {
          sortable: true
        },
        helicopter: {
          sortable: true,
        },
      },
      formFields: {
        workType: {
          type: SELECT,
          multiSelect: false,
          groupNameSelectable: true,
          options: 'workTypes',
          isFilterable: true,
        },
        name: {
          type: TEXT,
        },
        helicopter: {
          type: SELECT,
          multiSelect: false,
          groupNameSelectable: true,
          options: 'helicopters',
          isFilterable: true,
        },
      }
    },
    'govCustomers': {
      filterable: true,
      tableColumns: {
        number: {
          sortable: true
        },
        name: {
          sortable: true
        },
        'data.description': {
          sortable: true
        }
      },
      formFields: {
        number: {
          type: TEXT,
          isFilterable: true,
        },
        name: {
          type: TEXT,
        },
        'data.description': {
          type: TEXT,
        }
      }
    },
    'subcontractor': {
      filterable: true,
      tableColumns: {
        name: {
          sortable: true
        },
        'data.workTypes': {
          sortable: true
        },                
        'data.description': {
          sortable: true
        },             
        agency: {
          sortable: true
        },        
        'data.inn': {
          sortable: true
        },        
        'data.kpp': {
          sortable: true
        },        
        'data.address.place': {
          sortable: true
        },        
        'data.address.post': {
          sortable: true
        },
        'data.certificate': {
          sortable: true
        },
      },
      formFields: {
        name: {
          type: TEXT,
        },
        'data.workTypes': {
          type: SELECT,
          multiSelect: true,
          groupNameSelectable: true,
          writingName: 'data.workType',
          options: 'workTypes',
          isFilterable: true,
        },        
        agency: {
          type: SELECT,
          multiSelect: false,
          groupNameSelectable: true,
          // writingName: 'data.agency',
          options: 'agency',
          isFilterable: true,
        },        
        'data.description': {
          type: TEXT,
        },                 
        'data.inn': {
          type: TEXT,
        },        
        'data.kpp': {
          type: TEXT,
        },        
        'data.address.place': {
          type: TEXT,
        },        
        'data.address.post': {
          type: TEXT,
        },
        'data.certificate': {
          type: TEXT,
        },
      }
    },
    'recipient': {
      tableColumns: {
        name: {
          sortable: true
        },
      },
      formFields: {
        name: {
          type: TEXT,
        },
      }
    },
    'helicopter': {
      filterable: true,
      tableColumns: {
        number: {
          sortable: true
        },
        name: {
          sortable: true,
        },
        type: {
          sortable: true
        }
      },
      formFields: {
        number: {
          type: TEXT,
          isFilterable: true,
        },
        name: {
          type: TEXT,
        },
        type: {
          type: SELECT,
          multiSelect: false,
          groupNameSelectable: true,
          options: 'helicopters',
          isFilterable: true,
        }
      }
    },
    'catalogComponents': {
      filterable: true,
      tableColumns: {
        name: {
          sortable: true
        },
        symbol: {
          sortable: true
        },
        number18675: {
          sortable: true
        },
        workType: {
          sortable: true
        },
        helicopters: {
          sortable: true
        },
        standards: {
          sortable: true
        },
      },
      formFields: {
        name: {
          type: TEXT,
        },
        symbol: {
          type: TEXT,
        },
        number18675: {
          type: TEXT,
          writingName: 'standard18675'
        },
        workType: {
          type: SELECT,
          multiSelect: true,
          groupNameSelectable: true,
          options: 'workTypes',
          writingName: 'data.workTypes',
          isFilterable: true,
        },
        helicopters: {
          type: SELECT,
          multiSelect: true,
          groupNameSelectable: true,
          options: 'helicopters',
          writingName: 'data.helicopters',
          isFilterable: true,
        },
        standards: {
          type: SELECT,
          multiSelect: true,
          groupNameSelectable: true,
          options: 'standards',
          writingName: 'data.standards',
          isFilterable: true,
        },
      }
    },
    'catalogUnits': {
      tableColumns: {
        name: {
          sortable: true,
        },
      },
      formFields: {
        name: {
          type: TEXT,
        },
      },
    },
    'statusSupply': {
      tableColumns: {
        name: {
          sortable: true,
        }
      },
      formFields: {
        name: {
          type: TEXT,
        }
      }
    },    
    'statusContract': {
      tableColumns: {
        name: {
          sortable: true,
        }
      },
      formFields: {
        name: {
          type: TEXT,
        }
      }
    },
    'statusStage': {
      tableColumns: {
        name: {
          sortable: true,
        }
      },
      formFields: {
        name: {
          type: TEXT,
        }
      }
    },
    'statusAdjustment': {
      tableColumns: {
        name: {
          sortable: true,
        }
      },
      formFields: {
        name: {
          type: TEXT,
        }
      }
    },
    'statusSpecification': {
      tableColumns: {
        name: {
          sortable: true,
        }
      },
      formFields: {
        name: {
          type: TEXT,
        }
      }
    },
    'performers-prices': {
      tableColumns: {
        name: {
          sortable: true,
        }
      },
      formFields: {
        name: {
          type: TEXT,
        }
      }
    },
    'agency': {
      tableColumns: {
        name: {
          sortable: true,
        },
        'data.description': {
          sortable: true,
        }
      },
      formFields: {
        name: {
          type: TEXT
        },
        'data.description': {
          type: TEXT
        }
      }
    },
    'catalogStandarts': {
      tableColumns: {
        name: {
          sortable: true
        },
        symbol: {
          sortable: true
        },
      },
      formFields: {
        name: {
          type: TEXT,
        },
        symbol: {
          type: TEXT,
        },
      }
    }
  }
}