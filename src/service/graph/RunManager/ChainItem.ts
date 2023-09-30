import {GraphInvokableNode} from "../GraphNodes";
import {GraphChainEdge} from "../GraphEdge";

export class IChainItem {
    target: GraphInvokableNode
    edge?: GraphChainEdge
    outgoingConnected?: IChainItem[]
    inner?: IChainItem[]
    end?: IChainItem

    constructor(target: GraphInvokableNode, edge?: GraphChainEdge) {
        this.target = target
        this.edge = edge
    }

    get stepExecutionCompensation() {
        return this.target.stepExecutionCompensation
    }

    get toRoot() {
        return this.target.toRoot
    }
}
