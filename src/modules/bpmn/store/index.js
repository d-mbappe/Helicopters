import {AXIOS} from "@/store/axios";

export  default {
  state: () => ({
    // structureModel: '<?xml version="1.0" encoding="UTF-8"?>\n' +
    //   '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0fppxr8" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
    //   '  <bpmn:process id="Process_1" isExecutable="false">\n' +
    //   '    <bpmn:startEvent id="StartEvent_1" name="Start">\n' +
    //   '      <bpmn:outgoing>SequenceFlow_0nrfbee</bpmn:outgoing>\n' +
    //   '    </bpmn:startEvent>\n' +
    //   '    <bpmn:task id="Task_0ho18x0" name="end">\n' +
    //   '      <bpmn:incoming>SequenceFlow_0nrfbee</bpmn:incoming>\n' +
    //   '      <bpmn:outgoing>SequenceFlow_00ho26x</bpmn:outgoing>\n' +
    //   '    </bpmn:task>\n' +
    //   '    <bpmn:sequenceFlow id="SequenceFlow_0nrfbee" sourceRef="StartEvent_1" targetRef="Task_0ho18x0" />\n' +
    //   '    <bpmn:sequenceFlow id="SequenceFlow_00ho26x" sourceRef="Task_0ho18x0" />\n' +
    //   '    <bpmn:sequenceFlow id="SequenceFlow_18df8vb" />\n' +
    //   '    <bpmn:task id="Activity_006kcoh" />\n' +
    //   '  </bpmn:process>\n' +
    //   '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    //   '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
    //   '      <bpmndi:BPMNEdge id="SequenceFlow_0nrfbee_di" bpmnElement="SequenceFlow_0nrfbee">\n' +
    //   '        <di:waypoint x="209" y="120" />\n' +
    //   '        <di:waypoint x="347" y="120" />\n' +
    //   '        <di:waypoint x="347" y="284" />\n' +
    //   '        <di:waypoint x="485" y="284" />\n' +
    //   '      </bpmndi:BPMNEdge>\n' +
    //   '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
    //   '        <dc:Bounds x="173" y="102" width="36" height="36" />\n' +
    //   '        <bpmndi:BPMNLabel>\n' +
    //   '          <dc:Bounds x="178" y="145" width="27" height="27" />\n' +
    //   '        </bpmndi:BPMNLabel>\n' +
    //   '      </bpmndi:BPMNShape>\n' +
    //   '      <bpmndi:BPMNShape id="Task_0ho18x0_di" bpmnElement="Task_0ho18x0">\n' +
    //   '        <dc:Bounds x="485" y="244" width="100" height="80" />\n' +
    //   '      </bpmndi:BPMNShape>\n' +
    //   '      <bpmndi:BPMNShape id="Activity_006kcoh_di" bpmnElement="Activity_006kcoh">\n' +
    //   '        <dc:Bounds x="240" y="700" width="100" height="80" />\n' +
    //   '      </bpmndi:BPMNShape>\n' +
    //   '    </bpmndi:BPMNPlane>\n' +
    //   '  </bpmndi:BPMNDiagram>\n' +
    //   '</bpmn:definitions>',
    structureModel: null
  }),
  getters: {
  },
  mutations: {
    saveXML(state, xml) {
      state.structureModel = xml;
    }
  },
  actions: {
    saveModel( { commit, state }, model ) {
      commit('saveXML', model.xmlData)

      return new Promise((resolve, reject) => {
        commit('set_auth_token')

        AXIOS.get('')
          .then(resp => {

          })
          .catch(err => {
            reject(err)
            console.log(err)
          })
      })
    }
  },

}