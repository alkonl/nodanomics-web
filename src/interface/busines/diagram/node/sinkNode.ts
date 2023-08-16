import {EDiagramNode, INodeDataWithInteractivity} from "./structures";

export interface ISinkNodeData extends INodeDataWithInteractivity {
    type: EDiagramNode.Sink;
}
