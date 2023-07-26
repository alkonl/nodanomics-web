import {
    ENodeAction,
    IDiagramNodeBaseData,
    IResource,
    IUpdateGraphNodeState,
    IVariableNodeData
} from "../../../interface";
import {GraphDataEdge} from "../GraphEdge";
import {GraphBaseNode, GraphInteractiveNode} from "./abstracts";
import {GraphSourceNode} from "./GraphSourceNode";
import {RunManager} from "../RunManager";

export class GraphVariableNode extends GraphInteractiveNode<IVariableNodeData>
    implements IUpdateGraphNodeState {


    constructor(data: IVariableNodeData, runManager: RunManager) {
        super(data, runManager);
    }

    get maxResources() {
        return this.data.maxResources;
    }

    get minResources() {
        return this.data.minResources;
    }

    get currentResources() {
        return this.data.resources.length;
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

    get isSourceInIncomingEdges(): boolean {
        return this.incomingEdges.some(edge => edge.source instanceof GraphSourceNode);
    }

    updateState() {
        this.reCalculateMaxMinValue()
    }

    addResource(resource?: IResource[]) {
        if (resource) {
            this._data = {
                ...this.data,
                resources: [...this.data.resources, ...resource]
            }
        }
    }


    protected runAction() {
        this.pullAllOrAnyResourcesFromSource()
        this.pushAllResources()
        this.pushAnyResources()
        this.pullAnyResourcesFromVariable()
        this.pullAllResourcesFromVariable()
    }

    private reCalculateMaxMinValue() {
        console.log(this.maxResources, this.minResources, this.currentResources)
        if (this.maxResources === undefined || this.maxResources <= this.currentResources) {
            this._data = {
                ...this.data,
                maxResources: this.currentResources
            }
        }
        if (this.minResources === undefined || this.minResources >= this.currentResources) {
            this._data = {
                ...this.data,
                minResources: this.currentResources
            }
        }
    }


    private pullAnyResourcesFromVariable() {
        if (this.actionMode === ENodeAction.pullAny) {
            this.incomingEdges.forEach(edge => {
                if (edge instanceof GraphDataEdge && edge.source instanceof GraphVariableNode) {
                    const resources = edge.source.takeCountResources(edge.countOfResource)
                    this.addResource(resources)
                }
            })
        }
    }

    private pullAllResourcesFromVariable() {
        if (this.actionMode === ENodeAction.pullAll) {
            this.incomingEdges.forEach(edge => {
                if (edge instanceof GraphDataEdge && edge.source instanceof GraphVariableNode) {
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
                    if (edge.target instanceof GraphVariableNode) {
                        const resources = this.takeCountResources(edge.countOfResource)
                        edge.target.addResource(resources)
                    }
                }
            })
        }
    }

    private pushAllResources() {
        if (this.actionMode === ENodeAction.pushAll) {
            if (this.resourcesCount >= this.countOfRequiredOutgoingResources) {
                this.outgoingEdges.forEach(edge => {
                    if (edge instanceof GraphDataEdge) {
                        if (edge.target instanceof GraphVariableNode) {
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

    static baseNodeIsVariable(baseNode: GraphBaseNode<IDiagramNodeBaseData>): baseNode is GraphVariableNode {
        return baseNode instanceof GraphVariableNode;
    }
}
