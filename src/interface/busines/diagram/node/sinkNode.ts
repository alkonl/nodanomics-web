import {EDiagramNode, INodeDataWithInteractivity} from "./structures";
import {INodeHistory} from "./additional";
import {IIsElementExecuted} from "../generic";

export interface ISinkNodeData extends INodeDataWithInteractivity, INodeHistory, IIsElementExecuted {
    type: EDiagramNode.Sink;
}
