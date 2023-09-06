import {EDiagramNode, ILoopNodeData} from "../structures";
import {INodeSize} from "../additional";
import {IDiagramNodeStyle} from "../../elementStyle";
import {IIsElementExecuted} from "../../generic";

export type IWhileLoopNodeDataStyle = INodeSize & IDiagramNodeStyle;

export interface IWhileLoopNodeData extends ILoopNodeData, IIsElementExecuted {
    type: EDiagramNode.WhileLoop;
    style: IWhileLoopNodeDataStyle;
}
