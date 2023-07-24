import {EDiagramNode, IDiagramNodeBaseData} from "./structures";

export interface IVariableNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Variable;
    value?: number
}
