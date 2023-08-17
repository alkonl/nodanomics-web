import {IDiagramNodeBaseData} from "../diagram";

export interface IUpdateGraphNodeStatePerStep {
    updateStatePerStep(): void
}

export const isIUpdateGraphNodeStatePerStep = (obj: any): obj is (IDiagramNodeBaseData & IUpdateGraphNodeStatePerStep) => {
    return 'updateStatePerStep' in obj && typeof obj.updateStatePerStep === 'function'
}
