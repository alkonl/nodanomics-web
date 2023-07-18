import {GraphBaseNode} from "./GraphBaseNode";
import {IDiagramNodeBaseData} from "../../../interface";

export abstract class GraphInvokableNode<IGenericNodeData extends IDiagramNodeBaseData> extends GraphBaseNode<IGenericNodeData> {
    abstract invokeStep(): void
}
