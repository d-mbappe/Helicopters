import VSelect from '../../components/ui/Select.vue';

export default {
  component: VSelect,
  title: 'Components/ui/Select'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    VSelect
  },
  data () {
    return {
      select: 1
    }
  },
  template: `<v-select
              id="select"
              :options="[1, 2, 3, 4]"
              v-model="select"
              v-bind="$props"
            />`
})

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  holder: 'Placeholder...'
};
