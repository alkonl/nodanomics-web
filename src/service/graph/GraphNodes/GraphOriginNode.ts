import {IOriginNodeData, IResetBeforeStep} from "../../../interface";
import {GraphInteractiveNode} from "./abstracts";
import {GraphDataNode} from "./GraphDataNode";
import {GraphDataEdge} from "../GraphEdge";
import {RunManager} from "../RunManager";
import {generateResource} from "../../diagram";
import {GraphNodeManager} from "../NodeManager";

export class GraphOriginNode extends GraphInteractiveNode<IOriginNodeData>
    implements IResetBeforeStep {
    constructor(data: IOriginNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(data, runManager, nodeManager);
    }

    protected runAction() {
        this.pushAllOrAnyResources()
    }

    pushAllOrAnyResources() {
        this.edgesToVariables.forEach(edge => {
            const resources = this.generateResourceFromSource(edge.countOfResource);
            if (GraphDataNode.baseNodeIsData(edge.target)) {
                const onSuccess = (resourcesValue: number) => {
                    edge.changeIsTransferredResources(true, resourcesValue)
                }
                edge.target.addResource(resources, this.addingResourcesMode, {
                    onSuccess
                });
            }
        })
    }

    get edgesToVariables(): GraphDataEdge[] {
        return this.outgoingEdges
            .filter(edge => GraphDataNode.baseNodeIsData(edge.target))
            .filter(edge => GraphDataEdge.baseEdgeIsData(edge)) as GraphDataEdge[];
    }

    generateResourceFromSource(countOfResource: number) {
        return generateResource(countOfResource)
    }
}
