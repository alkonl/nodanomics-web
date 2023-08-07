import {GraphLoopNode} from "./abstracts";
import {
    EConnectionMode,
    isIIsEventTriggered,
    IUpdateGraphNodeState,
    IWhileLoopNodeData
} from "../../../interface";
import {RunManager} from "../RunManager";

export class GraphWhileLoopNode extends GraphLoopNode<IWhileLoopNodeData>
    implements IUpdateGraphNodeState {
    constructor(value: IWhileLoopNodeData, runManager: RunManager) {
        super(value, runManager)
    }


    protected checkIsLoopActive() {
        this.updateNode({isLoopActive: this.isTriggeredIncomingNodes})
    }

    get isTriggeredIncomingNodes(): boolean {
        return this.incomingEdges.some(edge => {
            const source = edge.source;
            if (isIIsEventTriggered(source)) {
                return source.isEventTriggered(edge.data.mode)
            }
            return false
        })
    }

    isEventTriggered(mode?: EConnectionMode) {
        if (mode === EConnectionMode.LoopOut) {
            return this.isLoopWasActive && !this.isLoopActive
        } else if (mode === EConnectionMode.LoopIn) {
            return this.isTriggeredIncomingNodes
        } else if (mode === EConnectionMode.LoopInToChildren) {
            return this.isTriggeredIncomingNodes
        }
        throw new Error(`isEventTriggered: unknown or empty mode ${mode}`)
    }


    updateState() {
        this.checkIsLoopActive()
    }

}
