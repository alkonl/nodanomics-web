import {EDiagramNode, IDiagramNodeBaseData} from "./structures";

export interface IDatasetDatafield extends IDiagramNodeBaseData {
    type: EDiagramNode.DatasetDatafield;
    datasetId?: string;
    isReadOnly?: boolean;
}
