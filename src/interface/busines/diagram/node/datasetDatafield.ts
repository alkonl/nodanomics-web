import {EDiagramNode, IDiagramNodeBaseData} from "./structures";

export interface namedVariable {
    [key: string]: string | number | boolean
}

export interface IDatasetDatafield extends IDiagramNodeBaseData {
    type: EDiagramNode.DatasetDatafield;
    datasetId?: string;
    isReadOnly?: boolean;
    namedVariables?: namedVariable;
}
