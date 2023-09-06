import {EDiagramNode, IDiagramNodeBaseData} from "./baseNode";
import {INodeSize, INumberVariable} from "../additional";
import {IDiagramNodeStyle} from "../../elementStyle";
import {IInvokableNode} from "./invokableNode";

export type ILoopNodeDataStyle = INodeSize & IDiagramNodeStyle;

export interface ILoopNodeData extends IInvokableNode {
    type: EDiagramNode.MicroLoop | EDiagramNode.WhileLoop,
    isLoopWasActive?: boolean;
    isLoopActive?: boolean;
    incomingVariables: INumberVariable[];
    outgoingVariables: INumberVariable[];
    children?: { name: string, id: string }[];
    style: ILoopNodeDataStyle
}

export const isILoopNodeData = (obj: IDiagramNodeBaseData): obj is ILoopNodeData => {
    return obj.type === EDiagramNode.MicroLoop || obj.type === EDiagramNode.WhileLoop
}
