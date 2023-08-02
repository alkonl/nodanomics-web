import {EDiagramNode} from "../structures";
import {INodeSize} from "../additional";
import {IDiagramNodeStyle} from "../../elementStyle";
import {ILoopNodeData} from "../structures/loopNode";

export type IWhileLoopNodeDataStyle = INodeSize & IDiagramNodeStyle;

export interface IWhileLoopNodeData extends ILoopNodeData {
    type: EDiagramNode.WhileLoop;
    style: IWhileLoopNodeDataStyle;
}
