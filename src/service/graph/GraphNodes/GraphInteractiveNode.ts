import {GraphBaseNode} from "./GraphBaseNode";
import {
    ENodeTrigger, IDiagramNodeBaseData,
    INodeDataWithInteractivity,
} from "../../../interface";


export abstract class GraphInteractiveNode<IGenericNodeData extends INodeDataWithInteractivity = INodeDataWithInteractivity>
    extends GraphBaseNode<IGenericNodeData> {


    invokeStep() {
        if (this.triggerMode === ENodeTrigger.automatic) {
            this.runAction();
        } else if (this.triggerMode === ENodeTrigger.enabling) {
            if (this.currentStep <= 1) {
                this.runAction();
            }
        }
    }

    protected abstract runAction(): void;

    get triggerMode() {
        return this._data.triggerMode;
    }

    get actionMode() {
        return this._data.actionMode;
    }

    static baseNodeIsInteractive(node: GraphBaseNode<IDiagramNodeBaseData>): node is GraphInteractiveNode {
        return node instanceof GraphInteractiveNode;
    }
}
