import {EDiagramNode, IDiagramNodeBaseData} from "../structures";

export interface IDatasetRecorder {
    datasetReceiverId?: string
    datasetX?: string
    datasetY?: string
}

export const isINodeDatasetRecorder = <T extends  IDiagramNodeBaseData>(obj: T): obj is (T & IDatasetRecorder) => {
    return [EDiagramNode.Data, EDiagramNode.Formula].includes(obj.type)
}
