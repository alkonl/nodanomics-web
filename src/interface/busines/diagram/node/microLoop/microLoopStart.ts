import {EDiagramNode, IDiagramNodeBaseData} from "../structures";

export interface IMicroLoopStartNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.MicroLoopStartNode;
    parentId: string;
}
