<template>
  <div id="" class="fixed_height">
    <BpmnModeler v-if="mode === 'modeler'"
                 ref='modeler'
                 v-model="modeler"
                 :diagramXML="structureModel"
                 propertiesPanel
    ></BpmnModeler>
    <BpmnViewer v-if="mode === 'viewer'"
                :xmlData="structureModel"
                :taskData="propTaskList"
    ></BpmnViewer>
<!--    <button @click="addTask" class="button" v-if="$refs.modeler">add task</button>-->
    <button @click="saveModel" class="button" v-if="$refs.modeler">Сохранить</button>
  </div>
</template>
<script>
import {mapState} from "vuex"

export default {
  name: 'bpmn',

  data() {
    return {
      mode: 'modeler',
      model: null,

      viewData: 'view',
      propTaskList: [
        {
          key: 'UserTask_06zjapk',
          completed: true
        },
        {
          key: 'UserTask_07cj5cp',
          completed: true
        },
        {
          key: 'UserTask_0hkfnx2',
          completed: true
        },
        {
          key: 'UserTask_1pvvtgn',
          completed: true
        },
        {
          key: 'Task_02tadrd',
          completed: false
        }
      ],
      modeler: {
        xmlData: "",
        svgImage: ""
      }
    }
  },
  watch: {
    modeler (val) {
      this.model = val;
    },
  },

  computed:  mapState({
    structureModel: state => state.bpmn.structureModel
  }),

  methods: {
    saveModel() {
      this.$store.dispatch('saveModel', this.model)
      console.log(typeof this.structureModel , 'model')
    },

    test (list) {
      console.log(list);
    },
    addTask () {
      let taskList = []
      if (Math.round(Math.random()) === 0) {
        taskList = [
          {
            label: 'test task1'
          },
          {
            label: ''
          }
        ]
      } else {
        taskList = [
          // {
          //   label: 'test task1'
          // }
        ]
      }
      let addOrReplace = {
        replaceActivity: 'UserTask_0hkfnx2',
        taskList: taskList
      }
      this.$refs.modeler.replace(addOrReplace).then((data) => {
        // new task list
        console.log(data);
      });
    }
  }
}
</script>
<style lang="scss">
.fixed_height {
  height: calc(100vh - 60px);
}
.workspace {
  position: relative;

  .containers {
    position: relative;
    background-color: #fff;
    width: 100%;
    height: 100%;
  }
}
.button {
  position: absolute;
  left: 60px;
  bottom: 50px;
  height: 40px;
  width: 110px;
  z-index: 100;
  color: green;
  background: rgba(0, 128, 0, 0.2);
  border: 1px solid rgb(0, 128, 0);
  border-radius: 4px;
}
</style>
