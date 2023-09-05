import {
    EModeAddResourcesToDataNode,
    ENodeAction,
    ENodeTrigger,
    INodeDataWithInteractivity,
    isIIsEventTriggered
} from "../../../../interface";
import {GraphInvokableNode} from "./GraphInvokable";
import {GraphEventListenerNode} from "../GraphEventListenerNode";
import {GraphLoopNode} from "./GraphLoopNode";


export abstract class GraphInteractiveNode<IGenericNodeData extends INodeDataWithInteractivity = INodeDataWithInteractivity>
    extends GraphInvokableNode<IGenericNodeData> {

    invokeStep() {

        if (this.triggerMode === ENodeTrigger.automatic) {
            this.runAction();
        } else if (this.triggerMode === ENodeTrigger.enabling) {
            if (this.currentDiagramStep <= 1) {
                this.runAction();
            } else if (this.isTriggeredIncomingNodes) {
                this.runAction();
            }
        } else if (this.triggerMode === ENodeTrigger.interactive) {
            if (this.isClicked) {
                this.runAction();
                this.clearClick()
            }
        } else if (this.triggerMode === ENodeTrigger.passive) {
            if (this.isTriggeredIncomingNodes) {
                this.runAction();
            }
        }
    }

    protected abstract runAction(): void;

    get addingResourcesMode() {
        if(this.actionMode === ENodeAction.pushAll || this.actionMode === ENodeAction.pullAll){
            return EModeAddResourcesToDataNode.onlyAll
        } else {
            return EModeAddResourcesToDataNode.asPossible
        }
    }

    get isTriggeredIncomingNodes(): boolean {
        return this.incomingEdges.some(edge => {
            const source = edge.source;
            if (isIIsEventTriggered(source)) {
                return source.isEventTriggered(edge.data.sourceMode)
            }
            return false
        })
    }

    private clearClick() {
        if (this._data.trigger.mode === ENodeTrigger.interactive) {
            this.updateNode({
                ...this.data,
                trigger: {
                    mode: ENodeTrigger.interactive,
                    isClicked: false,
                },
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

    get hasEventListeners(): boolean {
        return this.outgoingEdges.some(edge => edge.source instanceof GraphEventListenerNode || edge.source instanceof GraphLoopNode)
    }
}
