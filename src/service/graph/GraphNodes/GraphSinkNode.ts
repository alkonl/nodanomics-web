import {GraphInteractiveNode} from "./abstracts";
import {ENodeAction, ISinkNodeData} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";
import {GraphDataEdge} from "../GraphEdge";
import {GraphDataNode} from "./GraphDataNode";

export class GraphSinkNode extends GraphInteractiveNode<ISinkNodeData> {
    constructor(data: ISinkNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(data, runManager, nodeManager);
    }

    protected runAction() {
        this.pullAnyResourcesFromData()
        this.pullAllResourcesFromData()
    }


    private pullAnyResourcesFromData() {
        if (this.actionMode === ENodeAction.pullAny) {
            this.incomingEdges.forEach(edge => {
                const source = edge.source;
                if (edge instanceof GraphDataEdge && source instanceof GraphDataNode) {
                    const resources = source.takeCountResources(edge.countOfResource)
                    if (resources && resources.length > 0) {
                        edge.changeIsTransferredResources(true)
                    }
                }
            })
        }
    }

    private pullAllResourcesFromData() {
        if (this.actionMode === ENodeAction.pullAll) {
            this.incomingEdges.forEach(edge => {
                const source = edge.source;
                if (edge instanceof GraphDataEdge && source instanceof GraphDataNode) {
                    if (source.resourcesToProvideCount >= edge.countOfResource) {
                        const resources = source.takeCountResources(edge.countOfResource)
                        if (resources && resources.length > 0) {
                            edge.changeIsTransferredResources(true)
                        }
                    }
                }
            })
        }
    }
}
