import Paginator from '@/components/common/Paginator.vue';

export default {
  component: Paginator,
  title: 'Components/common/Paginator',
  argTypes: {
    type: { control: { type: 'select', options: ['button', 'submit'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    Paginator
  },
  template: `<Paginator
              :pages-count="20" 
              @to-change-page="toChangePage"
            />`
})

export const Primary = Template.bind({});
Primary.args = {
  // label: 'Accent button',
  // type: 'button',
  // class: 'btn--primary btn--normal'
};