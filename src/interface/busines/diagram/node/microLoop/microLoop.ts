import {EDiagramNode, ILoopNodeData} from "../structures";
import {IDiagramNodeStyle} from "../../elementStyle";
import {INodeSize} from "../additional";
import {IIsElementExecuted} from "../../generic";

export type IMicroLoopNodeDataStyle = INodeSize & IDiagramNodeStyle;


export interface IMicroLoopNodeData extends ILoopNodeData, IIsElementExecuted {
    type: EDiagramNode.MicroLoop;
    loopFormula?: string;
    currentLoopCount: number;
    style: IMicroLoopNodeDataStyle;
    isAccumulative?: boolean;
}

