import {EDiagramNode, IDiagramNodeBaseData} from "./baseNode";
import {INodeSize, INumberVariable} from "../additional";
import {IDiagramNodeStyle} from "../../elementStyle";

export type ILoopNodeDataStyle = INodeSize & IDiagramNodeStyle;

export interface ILoopNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.MicroLoop | EDiagramNode.WhileLoop,
    isLoopWasActive?: boolean;
    isLoopActive?: boolean;
    incomingVariables: INumberVariable[];
    outgoingVariables: INumberVariable[];
    children?: string[];
    style: ILoopNodeDataStyle
}

export const isILoopNodeData = (obj: IDiagramNodeBaseData): obj is ILoopNodeData => {
    return obj.type === EDiagramNode.MicroLoop || obj.type === EDiagramNode.WhileLoop
}
