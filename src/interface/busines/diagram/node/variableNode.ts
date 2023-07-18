import {EDiagramNode, IDiagramNodeBaseData} from "./baseNode";

export interface IVariableNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Variable;
    value?: number
}
