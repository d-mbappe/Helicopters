import Table from '@/components/common/Table.vue';

export default {
  component: Table,
  title: 'Components/common/Table',
  argTypes: {
    type: { control: { type: 'select', options: ['button', 'submit'] } },
  },
}

const exampleData = [
  {
    'Номер Спецификации': '№ВР-20-0315-04-01/СП 1.2 ',
    'Дата создания': '30.06.2020',
    'Исполнитель': 'АО “СМПП”',
    'ВПО МО РФ': '№435',
    'Общая стоимость (руб.)': '100 000',
    'Договор': '№ВР-20-0124-04-01',
  },
  {
    'Номер Спецификации': '№ВР-20-0315-04-01/СП 1.2 ',
    'Дата создания': '30.06.2020',
    'Исполнитель': 'АО “СМПП”',
    'ВПО МО РФ': '№435',
    'Общая стоимость (руб.)': '100 000',
    'Договор': '№ВР-20-0124-04-01',
  },
  {
    'Номер Спецификации': '№ВР-20-0315-04-01/СП 1.2 ',
    'Дата создания': '30.06.2020',
    'Исполнитель': 'АО “СМПП”',
    'ВПО МО РФ': '№435',
    'Общая стоимость (руб.)': '100 000',
    'Договор': '№ВР-20-0124-04-01',
  },
  {
    'Номер Спецификации': '№ВР-20-0315-04-01/СП 1.2 ',
    'Дата создания': '30.06.2020',
    'Исполнитель': 'АО “СМПП”',
    'ВПО МО РФ': '№435',
    'Общая стоимость (руб.)': '100 000',
    'Договор': '№ВР-20-0124-04-01',
  },
  {
    'Номер Спецификации': '№ВР-20-0315-04-01/СП 1.2 ',
    'Дата создания': '30.06.2020',
    'Исполнитель': 'АО “СМПП”',
    'ВПО МО РФ': '№435',
    'Общая стоимость (руб.)': '100 000',
    'Договор': '№ВР-20-0124-04-01',
  },
]

const exampleColumns = [
  'Номер Спецификации',
  'Дата создания',
  'Исполнитель',
  'ВПО МО РФ',
  'Общая стоимость (руб.)',
  'Договор',
]


const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    Table
  },
  data: () => ({
    exampleData: exampleData,
    exampleColumns: exampleColumns,
  }),
  template: `<Table
              :data="exampleData"
              :columns="exampleColumns" 
              tableTitle="Пример таблицы"
              commonDots
              commonCheckbox
              rowCheckbox
              rowDots
            />`
})

export const Primary = Template.bind({});
Primary.args = {
  // label: 'Accent button',
  // type: 'button',
  // class: 'btn--primary btn--normal'
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Secondary button',
//   type: 'button',
//   class: 'btn--secondary btn--normal'
// };
