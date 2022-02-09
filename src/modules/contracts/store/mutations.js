export default {
  changeContractsData(state, { contracts }) {
    state.contracts = contracts
  },
  changeSpecialists(state, { specialists }) {
    state.specialists = specialists
  },
  changeSpecialistsList(state, { specialistsList }) {
    state.specialistsList = specialistsList
  },
  changeAgreement(state, { agreement }) {
    state.agreement = agreement
  },
  changeContractWorks(state, { contractWorks }) {
    state.contractWorks = contractWorks
  },
  changeDocuments(state, { documents }) {
    state.documents = documents
  },
  changeAdjustments(state, { adjustments }) {
    state.adjustments = adjustments
  },
  changeHelicopters(state, { helicopters }) {
    state.helicopters = helicopters
  },
  changeWorkTypes(state, { workTypes }) {
    state.workTypes = workTypes
  },
  changeRecipients(state, { recipients }) {
    state.recipients = recipients
  },
}
