import {EDiagramNode, ILoopNodeData} from "../structures";
import {IDiagramNodeStyle} from "../../elementStyle";
import {INodeSize} from "../additional";

export type IMicroLoopNodeDataStyle = INodeSize & IDiagramNodeStyle;


export interface IMicroLoopNodeData extends ILoopNodeData {
    type: EDiagramNode.MicroLoop;
    loopCount?: number;
    currentLoopCount: number;
    style: IMicroLoopNodeDataStyle;
}

