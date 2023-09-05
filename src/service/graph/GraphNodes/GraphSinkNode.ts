import {GraphInteractiveNode} from "./abstracts";
import {ENodeAction, IResetBeforeStep, ISinkNodeData} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";
import {GraphDataEdge} from "../GraphEdge";
import {GraphDataNode} from "./GraphDataNode";
import {GraphHistoryManager} from "../GraphHistoryManager";

export class GraphSinkNode extends GraphInteractiveNode<ISinkNodeData> {

    private readonly historyManager: GraphHistoryManager = new GraphHistoryManager(this);

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
            this.incomingEdges.forEach(edge => {
                const source = edge.source;
                if (edge instanceof GraphDataEdge && source instanceof GraphDataNode) {
                    const resources = source.takeCountResources(edge.countOfResource)
                    if (resources && resources.length > 0) {
                        edge.changeIsTransferredResources(true, resources.length)
                    }
                    this.historyManager.updateCurrentStepHistory(resources?.length)
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
                            edge.changeIsTransferredResources(true, resources.length)
                        }
                        this.historyManager.updateCurrentStepHistory(resources?.length)
                    }
                }
            })
        }
    }


}
