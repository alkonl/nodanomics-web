import {EDiagramNode, IDiagramNodeBaseData} from "../structures";
import {INodeSize} from "../additional";
import {IDiagramNodeStyle} from "../../elementStyle";

export type IWhileLoopNodeDataStyle = INodeSize & IDiagramNodeStyle;

export interface IWhileLoopNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.WhileLoop;
    isLoopActive?: boolean;
    style: IWhileLoopNodeDataStyle;
}
