import {ENodeTrigger, INodeDataWithInteractivity,} from "../../../../interface";
import {GraphInvokableNode} from "./GraphInvokable";
import {isIIsEventTriggered} from "../../../../interface/busines/graph/isEventTriggered";


export abstract class GraphInteractiveNode<IGenericNodeData extends INodeDataWithInteractivity = INodeDataWithInteractivity>
    extends GraphInvokableNode<IGenericNodeData> {

    invokeStep() {
        if (this.triggerMode === ENodeTrigger.automatic) {
            this.runAction();
        } else if (this.triggerMode === ENodeTrigger.enabling) {
            if (this.currentStep <= 1) {
                this.runAction();
            } else if (this.isTriggeredIncomingNodes) {
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


    get isTriggeredIncomingNodes(): boolean {
        return this.incomingEdges.some(edge => {
            const source = edge.source;
            if (isIIsEventTriggered(source)) {
                console.log('edge:', edge)
                return source.isEventTriggered(edge.data.mode)
            }
            return false
        })
    }

    private clearClick() {
        if (this._data.trigger.mode === ENodeTrigger.interactive) {
            this.updateNode({
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
}
