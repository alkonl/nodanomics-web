import {GraphBaseNode} from "./GraphBaseNode";
import {IInvokableNode, IResetBeforeStep} from "../../../../interface";

export abstract class GraphInvokableNode<IGenericNodeData extends IInvokableNode = IInvokableNode> extends GraphBaseNode<IGenericNodeData>
implements IResetBeforeStep {
    // abstract invokeStep(): void

    invokeStep() {
        this.offIsExecuted()
    }

    protected offIsExecuted() {
        this._data = {
            ...this._data,
            isExecuted: true
        }
    }

    resetBeforeStep() {
        this._data = {
            ...this._data,
            isExecuted: false
        }
    }
}
