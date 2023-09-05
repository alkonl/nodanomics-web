import {EDiagramNode, IInvokableNode} from "./structures";

export interface IStartNodeData extends IInvokableNode {
    type: EDiagramNode.Start;
}
