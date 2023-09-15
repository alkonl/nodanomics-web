import {EDiagramNode, IInvokableNode} from "./structures";

export interface ITransferNodeData extends IInvokableNode {
    type: EDiagramNode.Transfer;
    transferTag?: string;
}
