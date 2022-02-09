import Tabs from '@/components/common/Tabs.vue';

export default {
  component: Tabs,
  title: 'Components/common/Tabs',
  argTypes: {
    type: { control: { type: 'select', options: ['button', 'submit'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    Paginator
  },
  template: ` <Tabs
                :tabs="['Первая', 'Вторая', 'Третья']"
                @on-active-tab="toActiveTab"
                isTableTabs
              />`
})

export const Primary = Template.bind({});
Primary.args = {
  // label: 'Accent button',
  // type: 'button',
  // class: 'btn--primary btn--normal'
};