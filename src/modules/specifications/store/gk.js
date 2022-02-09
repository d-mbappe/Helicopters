import {AXIOS} from '@/store/axios'

export default {
  state: () =>  ({
    specifications: [
      { 
        title: 'Спецификация ГК', 
        link: '/specifications/formation',
        status: {
          type: 'complete',
          name: 'Выполнена',
        },
        data: {
          'Номер': 'ВР-20-0056-04-02/СП 6.2',
          'Дата создания':'02.09.2020',
          'Исполнитель': 'АО «ВР»',
          'ВП МО РФ': '№708',
          'Общая стоимость': '20 000 000 руб',
        }
      },
      { 
        title: 'Спецификация ГК', 
        link: '/specifications/formation',
        status: {
          type: 'complete',
          name: 'Выполнена',
        },
        data: {
          'Номер': 'ВР-20-0056-04-02/СП 6.2',
          'Дата создания':'02.09.2020',
          'Исполнитель': 'АО «ВР»',
          'ВП МО РФ': '№708',
          'Общая стоимость': '20 000 000 руб',
        }
      },
      { 
        title: 'Спецификация ГК', 
        link: '/specifications/formation',
        status: {
          type: 'complete',
          name: 'Выполнена',
        },
        data: {
          'Номер': 'ВР-20-0056-04-02/СП 6.2',
          'Дата создания':'02.09.2020',
          'Исполнитель': 'АО «ВР»',
          'ВП МО РФ': '№708',
          'Общая стоимость': '20 000 000 руб',
        }
      },
      { title: 'Спецификация ГК', 
        link: '/specifications/formation',
        status: {
          type: 'complete',
          name: 'Выполнена',
        },
        data: {
          'Номер': 'ВР-20-0056-04-02/СП 6.2',
          'Дата создания':'02.09.2020',
          'Исполнитель': 'АО «ВР»',
          'ВП МО РФ': '№708',
          'Общая стоимость': '20 000 000 руб',
        }
      },
    ],
  }),
  mutations: {
  },
  actions: {
  },
  getters: {
    specifications: state => state.specifications,

  }
}
