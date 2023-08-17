import {EDiagramNode, IDiagramNodeBaseData} from "./structures";

export interface IStartNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Start;
}
