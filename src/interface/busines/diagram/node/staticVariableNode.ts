import {EDiagramNode, IDiagramNodeBaseData} from "./structures";

export interface IStaticVariableNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.StaticVariable;
    value?: number
}
