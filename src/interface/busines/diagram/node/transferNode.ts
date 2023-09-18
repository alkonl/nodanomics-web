import {EDiagramNode, IInvokableNode} from "./structures";
import {INodeHistory} from "./additional";

export interface ITransferNodeData extends IInvokableNode, INodeHistory {
    type: EDiagramNode.Transfer;
}
