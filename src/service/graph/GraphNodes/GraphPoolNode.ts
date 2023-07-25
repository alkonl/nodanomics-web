import {ENodeAction, IDiagramNodeBaseData, IPoolNodeData, IResource} from "../../../interface";
import {GraphDataEdge} from "../GraphEdge";
import {GraphInteractiveNode, GraphBaseNode} from "./abstracts";
import {GraphSourceNode} from "./GraphSourceNode";
import {RunManager} from "../RunManager";

export class GraphPoolNode extends GraphInteractiveNode<IPoolNodeData> {


    constructor(data: IPoolNodeData, runManager: RunManager) {
        super(data, runManager);
    }

    get resources() {
        return this.data.resources;
    }

    get resourcesCount() {
        return this.data.resources.length;
    }


    get edgesFromSources(): GraphDataEdge[] {
        return this.incomingEdges
            .filter(edge => edge.source instanceof GraphSourceNode)
            .filter(edge => GraphDataEdge.baseEdgeIsData(edge)) as GraphDataEdge[];
    }




    addResource(resource?: IResource[]) {
        if (resource) {
            this._data = {
                ...this.data,
                resources: [...this.data.resources, ...resource]
            }
        }
    }

    resetState() {
        this._data = {
            ...this.data,
            resources: []
        }
    }

    protected runAction() {
        this.pullAllOrAnyResourcesFromSource()
        this.pushAllResources()
        this.pushAnyResources()
        this.pullAnyResourcesFromPool()
        this.pullAllResourcesFromPool()
    }


    private pullAnyResourcesFromPool() {
        if (this.actionMode === ENodeAction.pullAny) {
            this.incomingEdges.forEach(edge => {
                if (edge instanceof GraphDataEdge && edge.source instanceof GraphPoolNode) {
                    const resources = edge.source.takeCountResources(edge.countOfResource)
                    this.addResource(resources)
                }
            })
        }
    }

    private pullAllResourcesFromPool() {
        if (this.actionMode === ENodeAction.pullAll) {
            this.incomingEdges.forEach(edge => {
                if (edge instanceof GraphDataEdge && edge.source instanceof GraphPoolNode) {
                    if (edge.source.resourcesCount >= edge.countOfResource) {
                        const resources = edge.source.takeCountResources(edge.countOfResource)
                        this.addResource(resources)
                    }
                }
            })
        }
    }

    private get countOfRequiredOutgoingResources() {
        return this.outgoingEdges.reduce((acc, edge) => {
            if (edge instanceof GraphDataEdge) {
                return acc + edge.countOfResource
            }
            return acc;
        }, 0)
    }

    private takeCountResources(count: number) {
        const deletedResources = this.resources.slice(0, count);
        this._data = {
            ...this.data,
            resources: this.resources.slice(count)
        }
        return deletedResources
    }

    private pushAnyResources() {
        if (this.actionMode === ENodeAction.pushAny) {
            this.outgoingEdges.forEach(edge => {
                if (edge instanceof GraphDataEdge) {
                    if (edge.target instanceof GraphPoolNode) {
                        const resources = this.takeCountResources(edge.countOfResource)
                        edge.target.addResource(resources)
                    }
                }
            })
        }
    }

    private pushAllResources() {
        if (this.actionMode === ENodeAction.pushAll) {
            if (this.resourcesCount > this.countOfRequiredOutgoingResources) {
                this.outgoingEdges.forEach(edge => {
                    if (edge instanceof GraphDataEdge) {
                        if (edge.target instanceof GraphPoolNode) {
                            const resources = this.takeCountResources(edge.countOfResource)
                            edge.target.addResource(resources)
                        }
                    }
                })
            }
        }
    }

    private pullAllOrAnyResourcesFromSource() {
        if (this.actionMode === ENodeAction.pullAll || this.actionMode === ENodeAction.pullAny) {
            this.edgesFromSources.forEach(edge => {
                const resources = edge.countOfResource
                if (edge.source instanceof GraphSourceNode) {
                    const generatedResources = edge.source.generateResourceFromSource(resources)
                    this.addResource(generatedResources)
                }
            })
        }
    }

    static baseNodeIsPool(baseNode: GraphBaseNode<IDiagramNodeBaseData>): baseNode is GraphPoolNode {
        return baseNode instanceof GraphPoolNode;
    }
}
