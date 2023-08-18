import {GraphInteractiveNode} from "./abstracts";
import {ENodeAction, ISinkNodeData, IUpdateGraphNodeStatePerStep} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";
import {GraphDataEdge} from "../GraphEdge";
import {GraphDataNode} from "./GraphDataNode";

export class GraphSinkNode extends GraphInteractiveNode<ISinkNodeData> implements IUpdateGraphNodeStatePerStep {


    private removedResourcesPerStep = 0;

    constructor(data: ISinkNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(data, runManager, nodeManager);
    }

    get history() {
        return this.data.history
    }

    updateStatePerStep() {
        this.updateHistory()
        this.removedResourcesPerStep = 0
    }

    protected runAction() {
        this.pullAnyResourcesFromData()
        this.pullAllResourcesFromData()
    }

    private updateHistory() {
        const step = this.runManager.currentStep
        const history = this.history || []
        this.updateNode({
            history: [...history.slice(0, step + 1), this.removedResourcesPerStep]
        })
    }

    private updateResources(count = 0) {
        this.removedResourcesPerStep += count
    }

    private pullAnyResourcesFromData() {
        if (this.actionMode === ENodeAction.pullAny) {
            this.incomingEdges.forEach(edge => {
                const source = edge.source;
                if (edge instanceof GraphDataEdge && source instanceof GraphDataNode) {
                    console.log('pullAny: ', edge.countOfResource)
                    const resources = source.takeCountResources(edge.countOfResource)

                    if (resources && resources.length > 0) {
                        edge.changeIsTransferredResources(true)
                    }
                    this.updateResources(resources?.length)
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
                        this.updateResources(resources?.length)
                    }
                }
            })
        }
    }


}
