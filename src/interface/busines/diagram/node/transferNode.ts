import {EDiagramNode, IInvokableNode} from "./structures";
import {INodeIncomingVariables} from "./additional";

export interface ITransferNodeData extends IInvokableNode, INodeIncomingVariables {
    type: EDiagramNode.Transfer;
}
