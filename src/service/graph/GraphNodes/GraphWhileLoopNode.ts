import {GraphLoopNode} from "./abstracts";
import {
    EConnectionMode,
    isIIsEventTriggered,
    IUpdateGraphNodeState,
    IWhileLoopNodeData
} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphWhileLoopNode extends GraphLoopNode<IWhileLoopNodeData>
    implements IUpdateGraphNodeState {

    constructor(value: IWhileLoopNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }


    protected checkIsLoopActive() {
        this.updateNode({isLoopActive: this.isTriggeredIncomingNodes})
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

    isEventTriggered(mode?: EConnectionMode) {
        if (mode === EConnectionMode.NodeOutgoing) {
            return this.isLoopWasActive && !this.isLoopActive
        } else if (mode === EConnectionMode.NodeIncoming) {
            return this.isTriggeredIncomingNodes
        } else if (mode === EConnectionMode.LoopInnerToChildren) {
            return this.isTriggeredIncomingNodes
        }
        throw new Error(`isEventTriggered: unknown or empty mode ${mode}`)
    }
}
