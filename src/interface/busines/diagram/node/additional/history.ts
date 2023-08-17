import {IDiagramNodeBaseData} from "../structures";

export interface INodeHistory {
    history?: number[]
}

export const isINodeHistory = (obj: IDiagramNodeBaseData): obj is (IDiagramNodeBaseData & INodeHistory) => {
    return 'history' in obj && Array.isArray(obj.history)
}
