import VRadio from '../../components/ui/Radio.vue';

export default {
  component: VRadio,
  title: 'Components/ui/Radio'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    VRadio
  },
  data () {
    return {
      test: ''
    }
  },
  template: `<div>
              <v-radio
                id="radio1"
                name="radio"
                v-model="test"
                value="radio1"
                v-bind="$props"
                style="margin-bottom: 10px"
              />
              <v-radio
                id="radio2"
                name="radio"
                v-model="test"
                value="radio2"
                v-bind="$props"
                style="margin-bottom: 10px"
              />
              {{ test }}
            </div>`
})

export const Default = Template.bind({});
Default.args = {
};

export const WithText = Template.bind({});
WithText.args = {
  text: 'Label'
};
