import {GraphInvokableNode} from "./abstracts";
import {IMicroLoopNodeData, isIIsEventTriggered, IUpdateGraphNodeState, IWhileLoopNodeData} from "../../../interface";
import {RunManager} from "../RunManager";

export class GraphWhileLoopNode extends GraphInvokableNode<IWhileLoopNodeData>
    implements IUpdateGraphNodeState{
    constructor(value: IWhileLoopNodeData, runManager: RunManager) {
        super(value, runManager)
    }

    get isTriggeredIncomingNodes(): boolean {
        return this.incomingEdges.some(edge => {
            const source = edge.source;
            if (isIIsEventTriggered(source)) {
                return source.isEventTriggered
            }
            return false
        })
    }

    updateState() {
        this.setIisLoopActive(this.isTriggeredIncomingNodes)
    }

    invokeStep() {
        this.updateState()
    }

    private setIisLoopActive(isLooping: boolean) {
        this._data = {
            ...this.data,
            isLoopActive: isLooping,
        }
    }
}
