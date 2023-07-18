import {GraphBaseNode} from "./GraphBaseNode";
import {
    ENodeTrigger, IDiagramNodeBaseData,
    INodeDataWithInteractivity,
} from "../../../interface";
import {GraphInvokableNode} from "./GraphInvokable";


export abstract class GraphInteractiveNode<IGenericNodeData extends INodeDataWithInteractivity = INodeDataWithInteractivity>
    extends GraphInvokableNode<IGenericNodeData> {


    invokeStep() {
        if (this.triggerMode === ENodeTrigger.automatic) {
            this.runAction();
        } else if (this.triggerMode === ENodeTrigger.enabling) {
            if (this.currentStep <= 1) {
                this.runAction();
            }
        } else if (this.triggerMode === ENodeTrigger.interactive) {
            if (this.isClicked) {
                this.runAction();
                this.clearClick()
            }
        }
    }

    protected abstract runAction(): void;


    private clearClick() {
        if (this._data.trigger.mode === ENodeTrigger.interactive) {
            this.updateNodeData({
                trigger: {
                    ...this._data.trigger,
                    isClicked: false,
                }
            })
        }
    }


    get triggerMode(): ENodeTrigger {
        return this._data.trigger.mode;
    }

    get isClicked(): boolean {
        if (this._data.trigger.mode === ENodeTrigger.interactive) {
            return this._data.trigger.isClicked;
        }
        return false;
    }

    get actionMode() {
        return this._data.actionMode;
    }

    static baseNodeIsInteractive(node: GraphBaseNode<IDiagramNodeBaseData>): node is GraphInteractiveNode {
        return node instanceof GraphInteractiveNode;
    }
}
