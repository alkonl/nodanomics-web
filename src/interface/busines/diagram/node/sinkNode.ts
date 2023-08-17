import {EDiagramNode, INodeDataWithInteractivity} from "./structures";
import {INodeHistory} from "./additional";

export interface ISinkNodeData extends INodeDataWithInteractivity, INodeHistory {
    type: EDiagramNode.Sink;
}
