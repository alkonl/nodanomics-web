import {GraphInvokableNode} from "./abstracts";
import {ITransferNodeData} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";
import {GraphResourceManager} from "./helper";
import {GraphHistoryManager} from "../GraphHistoryManager";

export class GraphTransferNode extends GraphInvokableNode<ITransferNodeData> {

    private readonly historyManager = new GraphHistoryManager(this, this.nodeManager)

    private readonly resourceManager = new GraphResourceManager({
        incomingEdges: this.incomingEdges,
        outgoingEdges: this.outgoingEdges
    });

    constructor(value: ITransferNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }

    invokeStep() {
        super.invokeStep();
        this.transferResources()
        this.updateState()
    }

    updateState() {
        super.updateState()
    }

    private transferResources() {
        const {resources} = this.resourceManager.pullAny()
        const joinedResources = this.resourceManager.joinResources(resources)
        this.historyManager.updateCurrentStepHistory(joinedResources.value)
        this.resourceManager.pushResourcesToFirst(joinedResources)
    }
}
