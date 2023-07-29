import {GraphBaseNode} from "./GraphBaseNode";
import {IDiagramNodeBaseData, INodeData} from "../../../../interface";

export abstract class GraphInvokableNode<IGenericNodeData extends IDiagramNodeBaseData = INodeData> extends GraphBaseNode<IGenericNodeData> {
    abstract invokeStep(): void
}
