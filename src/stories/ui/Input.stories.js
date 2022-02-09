import VInput from '../../components/ui/Input.vue';

export default {
  component: VInput,
  title: 'Components/ui/Input'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    VInput
  },
  data () {
    return {
      test: ''
    }
  },
  template: `<v-input
              v-model="test"
              v-bind="$props"
            />`
})

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  holder: 'Placeholder...',
  classEl: 'inpt__input--default'
};
