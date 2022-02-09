import VCheck from '../../components/ui/Checkbox.vue';

export default {
  component: VCheck,
  title: 'Components/ui/Checkbox'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    VCheck
  },
  data () {
    return {
      test: false
    }
  },
  template: `<v-check
              v-model="test"
              v-bind="$props"
            />`
})

export const Default = Template.bind({});
Default.args = {
  id: 'test'
};

export const WithText = Template.bind({});
WithText.args = {
  id: 'test2',
  text: 'Label'
};
