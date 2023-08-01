import {EDiagramNode, IDiagramNodeBaseData} from "../structures";

export interface IMicroLoopStartNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.MicroLoopStartNode;
    isLoopActive?: boolean;
    loopCurrentCount?: number;
    parentId: string;
}
