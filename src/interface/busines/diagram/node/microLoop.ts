import {EDiagramNode, IDiagramNodeBaseData} from "./structures";
import {IDiagramNodeStyle} from "../elementStyle";
import {INodeSize} from "./additional";

export type IMicroLoopNodeDataStyle = INodeSize & IDiagramNodeStyle;


export interface IMicroLoopNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.MicroLoop;
    loopCount?: number;
    style: IMicroLoopNodeDataStyle;
}

