import {EDiagramNode, IDiagramNodeBaseData} from "../structures";

export interface IDatasetRecorder {
    datasetReceiverId?: string
    datasetX?: number
    datasetY?: number
}

export const isINodeDatasetRecorder = <T extends  IDiagramNodeBaseData>(obj: T): obj is (T & IDatasetRecorder) => {
    return [EDiagramNode.Data].includes(obj.type)
}
