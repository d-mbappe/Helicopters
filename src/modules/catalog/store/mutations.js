export default {
  changeWorkType(state, { workType }) {
    state.workType = workType;
  },
  changeWorkName(state, { workName }) {
    state.workName = workName;
  },
  changeGovCustomers(state, { govCustomers }) {
    state.govCustomers = govCustomers;
  },
  changeSubcontractor(state, { subcontractor }) {
    state.subcontractor = subcontractor;
  },
  changeRecipient(state, { recipient }) {
    state.recipient = recipient;
  },
  changeHelicopter(state, { helicopter }) {
    state.helicopter = helicopter;
  },
  changeCatalogComponents(state, { catalogComponents }) {
    state.catalogComponents = catalogComponents;
  },
  changeCatalogUnits(state, { catalogUnits }) {
    state.catalogUnits = catalogUnits;
  },
  changeCatalogContract(state, { catalogContract }) {
    state.catalogContract = catalogContract;
  },
  changeStatusContract(state, { statusContract }) {
    state.statusContract = statusContract;
  },
  changeStatusSupply(state, { statusSupply }) {
    state.statusSupply = statusSupply;
  },
  changeStatusStage(state, { statusStage }) {
    state.statusStage = statusStage;
  },
  changeStatusSpecification(state, { statusSpecification }) {
    state.statusSpecification = statusSpecification;
  },
  changeCatalogStandarts(state, { catalogStandarts }) {
    state.catalogStandarts = catalogStandarts;
  },
  changeStatusAdjustment(state, { statusAdjustment }) {
    state.statusAdjustment = statusAdjustment;
  },
  changeAgency(state, { agency }) {
    state.agency = agency;
  },
  changeControlPoints(state, {controlPoints}) {
    state.controlPoints = controlPoints;
  },
  changeCurrentRevision(state, {currentRevision}) {
    state.currentRevision = currentRevision;
  },
};
