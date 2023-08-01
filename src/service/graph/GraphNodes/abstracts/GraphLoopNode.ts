import {IDiagramNodeBaseData, INodeData} from "../../../../interface";
import {GraphInvokableNode} from "./GraphInvokable";

export abstract class GraphLoopNode<IGenericNodeData extends IDiagramNodeBaseData = INodeData> extends GraphInvokableNode<IGenericNodeData> {
}
