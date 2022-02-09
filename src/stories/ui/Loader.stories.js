import Loader from '@/components/common/Loader.vue';

export default {
  component: Loader,
  title: 'Components/common/Loader',
  argTypes: {
    type: { control: { type: 'select', options: ['button', 'submit'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    Loader
  },
  template: `<Loader/>`
})

export const Primary = Template.bind({});
Primary.args = {
  // label: 'Accent button',
  // type: 'button',
  // class: 'btn--primary btn--normal'
};