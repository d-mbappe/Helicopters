import VBtn from '../../components/ui/Button.vue';

export default {
  component: VBtn,
  title: 'Components/ui/Button',
  argTypes: {
    type: { control: { type: 'select', options: ['button', 'submit'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    VBtn
  },
  template: `<v-btn
              @click="onClick"
              v-bind="$props"
              style="width: 160px"
            />`
})

export const Primary = Template.bind({});
Primary.args = {
  label: 'Accent button',
  type: 'button',
  class: 'btn--primary btn--normal'
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary button',
  type: 'button',
  class: 'btn--secondary btn--normal'
};
