import {GraphInteractiveNode} from "./abstracts";
import {ENodeAction, ISinkNodeData} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";
import {GraphHistoryManager} from "../GraphHistoryManager";
import {GraphResourceManager} from "./helper";
import {GraphDataEdge} from "../GraphEdge";
import {GraphDataNode} from "./GraphDataNode";

export class GraphSinkNode extends GraphInteractiveNode<ISinkNodeData> {

    private readonly historyManager: GraphHistoryManager = new GraphHistoryManager(this, this.nodeManager);
    private readonly resourceManager = new GraphResourceManager({
        incomingEdges: this.incomingEdges,
        outgoingEdges: this.outgoingEdges
    });

    constructor(data: ISinkNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(data, runManager, nodeManager);
    }

    get history() {
        return this.data.history
    }

    protected runAction() {
        this.pullAnyResourcesFromData()
        this.pullAllResourcesFromData()
    }

    private pullAnyResourcesFromData() {
        if (this.actionMode === ENodeAction.pullAny) {
            const {gettingResources} = this.resourceManager.pullAny()
            this.updateHistory(gettingResources)
        }
    }

    private pullAllResourcesFromData() {
        if (this.actionMode === ENodeAction.pullAll) {
            const {gettingResources} = this.resourceManager.pullAll()
            this.updateHistory(gettingResources)
        }
    }

    private updateHistory(count: number | undefined) {
        if (this.nodeManager.assignedHistoryNode && this.nodeManager.assignedNodeChanged) {
            this.historyManager.updateCurrentStepHistory(count)
        } else if (!this.nodeManager.assignedHistoryNode) {
            this.historyManager.updateCurrentStepHistory(count)
        }
    }

}
