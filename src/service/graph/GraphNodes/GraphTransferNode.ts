import {GraphInvokableNode} from "./abstracts";
import {ITransferNodeData} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";
import {GraphLogicManager} from "./helper";

export class GraphTransferNode extends GraphInvokableNode<ITransferNodeData> {
    private readonly logicManager: GraphLogicManager = new GraphLogicManager(this.incomingEdges);

    constructor(value: ITransferNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }

    invokeStep() {
        super.invokeStep();
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
}
