import {GraphLoopNode} from "./abstracts";
import {
    EConnectionMode,
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
        this.updateNode({isLoopActive: true})
    }

    // get isTriggeredIncomingNodes(): boolean {
    //     return this.incomingEdges.some(edge => {
    //         const source = edge.source;
    //         if (isIIsEventTriggered(source)) {
    //             return source.isEventTriggered(edge.data.sourceMode)
    //         }
    //         return false
    //     })
    // }

    isEventTriggered(mode?: EConnectionMode) {
        // if (mode === EConnectionMode.LoopInnerToChildren) {
        //     return this.isTriggeredIncomingNodes
        // }
        return true
    }
}
