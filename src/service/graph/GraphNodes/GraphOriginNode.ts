import {IOriginNodeData, IResetBeforeStep} from "../../../interface";
import {GraphInteractiveNode} from "./abstracts";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";
import {GraphResourceManager} from "./helper";

export class GraphOriginNode extends GraphInteractiveNode<IOriginNodeData>
    implements IResetBeforeStep {
    private readonly resourceManager = new GraphResourceManager({
        incomingEdges: this.incomingEdges,
        outgoingEdges: this.outgoingEdges
    });

    constructor(data: IOriginNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(data, runManager, nodeManager);
    }

    protected runAction() {
        this.pushAllOrAnyResources()
    }

    pushAllOrAnyResources() {
        this.resourceManager.generateResource(this.addingResourcesMode)
    }

    // get edgesToVariables(): GraphDataEdge[] {
    //     return this.outgoingEdges
    //         .filter(edge => GraphDataNode.baseNodeIsData(edge.target))
    //         .filter(edge => GraphDataEdge.baseEdgeIsData(edge)) as GraphDataEdge[];
    // }

    // generateResourceFromSource(countOfResource: number) {
    //     return generateResource(countOfResource)
    // }
}
