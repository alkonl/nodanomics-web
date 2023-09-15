import {GraphInvokableNode} from "./abstracts";
import {EModeAddResourcesToDataNode, ITransferNodeData} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";
import {GraphLogicManager, GraphResourceManager} from "./helper";

export class GraphTransferNode extends GraphInvokableNode<ITransferNodeData> {
    private readonly logicManager: GraphLogicManager = new GraphLogicManager(this.incomingEdges);
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
        this.updateVariables()
    }

    private updateVariables() {
        const incomingVariables = this.logicManager.getVariables()
        this.updateNode({
            incomingVariables
        })
    }

    private transferResources() {
        const {resources} = this.resourceManager.pullAny()
        const joinedResources = this.resourceManager.joinResources(resources)
        this.resourceManager.pushResourcesToFirst(joinedResources)
    }
}
