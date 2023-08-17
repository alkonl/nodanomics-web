import {
    EModeAddResourcesToDataNode,
    ENodeAction,
    IDataNodeData,
    IDiagramNodeBaseData,
    IGetNodeExternalValue,
    IResource,
    IUpdateGraphNodeState, IUpdateGraphNodeStatePerStep
} from "../../../interface";
import {GraphDataEdge} from "../GraphEdge";
import {GraphBaseNode, GraphInteractiveNode} from "./abstracts";
import {GraphOriginNode} from "./GraphOriginNode";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphDataNode extends GraphInteractiveNode<IDataNodeData>
    implements IUpdateGraphNodeState, IGetNodeExternalValue, IUpdateGraphNodeStatePerStep {

    private _resourcesToProvide: IResource[] = [];


    constructor(data: IDataNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(data, runManager, nodeManager);
    }


    get maxCapacity() {
        const maxCapacity = Number(this.data.maxCapacity);
        if (!isNaN(maxCapacity)) {
            return maxCapacity;
        }
    }

    get minCapacity() {
        const minCapacity = Number(this.data.minCapacity);
        if (!isNaN(minCapacity)) {
            return minCapacity;
        }
    }

    get resourcesToProvide() {
        return this._resourcesToProvide;
    }

    get resourcesToProvideCount() {
        return this._resourcesToProvide.length;
    }

    get maxResources() {
        return this.data.maxResources;
    }


    get minResources() {
        return this.data.minResources;
    }

    get currentResourcesCount() {
        return this.data.resources.length;
    }

    get resources() {
        return this.data.resources;
    }

    get nodeExternalValue() {
        return this.currentResourcesCount
    }


    get edgesFromSources(): GraphDataEdge[] {
        return this.incomingEdges
            .filter(edge => edge.source instanceof GraphOriginNode)
            .filter(edge => GraphDataEdge.baseEdgeIsData(edge)) as GraphDataEdge[];
    }

    resetResourcesToProvide() {
        this._resourcesToProvide = [];
    }

    updateStatePerStep() {
        this.reCalculateMaxMinAvgValue()
        this.updateResourcesCountHistory()
    }

    updateState() {
        super.updateState()
    }


    addResource(resources?: IResource[], mode?: EModeAddResourcesToDataNode, params?: {
        onSuccess?: () => void,
    }) {
        const updatedResources = this.addResourceWithCapacity(resources, mode)
        const isAdded = updatedResources !== undefined;
        if (isAdded && params?.onSuccess) {
            params.onSuccess()
        }
    }

    isPossibleToAddResource(resources: IResource[], mode: EModeAddResourcesToDataNode) {
        if (!this.maxCapacity) {
            return true;
        }
        if (mode === EModeAddResourcesToDataNode.onlyAll) {
            return this.currentResourcesCount + resources.length <= this.maxCapacity
        } else if (mode === EModeAddResourcesToDataNode.asPossible) {
            return this.currentResourcesCount + resources.length <= this.maxCapacity
        }
    }

    private addResourceWithCapacity(resources?: IResource[], mode?: EModeAddResourcesToDataNode): IDataNodeData | undefined {
        if (resources && resources.length > 0) {
            if (!this.maxCapacity) {
                return this.addResourcesToNode(resources)
            } else if (mode === EModeAddResourcesToDataNode.onlyAll && this.currentResourcesCount + resources?.length <= this.maxCapacity) {
                return this.addResourcesToNode(resources)
            } else if (mode === EModeAddResourcesToDataNode.asPossible) {
                const countOfResourcesToAdd = this.maxCapacity - this.currentResourcesCount;
                const resourcesToAdd = resources.slice(0, countOfResourcesToAdd);
                return this.addResourcesToNode(resourcesToAdd)
            }
        }

    }

    private addResourcesToNode(resources: IResource[]) {
        this._resourcesToProvide = [...this.data.resources];
        return this._data = {
            ...this.data,
            resources: [...this.data.resources, ...resources]
        }
    }

    private updateResourcesCountHistory() {
        this._data = {
            ...this.data,
            history: this.data.history
                ? [...this.data.history, this.currentResourcesCount]
                : [this.currentResourcesCount]
        }
    }

    invokeStep() {
        super.invokeStep();
    }


    protected runAction() {
        this.pullAllOrAnyResourcesFromSource()
        this.pushAllResources()
        this.pushAnyResources()
        this.pullAnyResourcesFromData()
        this.pullAllResourcesFromData()
    }

    updateRecoursesProvide() {
        this._resourcesToProvide = [...this.data.resources];
    }

    private reCalculateMaxMinAvgValue() {
        if (this.maxResources === undefined || this.maxResources <= this.currentResourcesCount) {
            this._data = {
                ...this.data,
                maxResources: this.currentResourcesCount
            }
        }
        if (this.minResources === undefined || this.minResources >= this.currentResourcesCount) {
            this._data = {
                ...this.data,
                minResources: this.currentResourcesCount
            }
        }
    }


    private pullAnyResourcesFromData() {
        if (this.actionMode === ENodeAction.pullAny) {
            this.incomingEdges.forEach(edge => {
                const source = edge.source;
                if (edge instanceof GraphDataEdge && source instanceof GraphDataNode) {
                    const isPossibleToAddResources = this.isPossibleToAddResource(source.resources, source.addingResourcesMode)
                    if (isPossibleToAddResources) {
                        const resources = source.takeCountResources(edge.countOfResource)
                        const onSuccess = () => this.writeToEdgeIsResourcesWereTransferred(edge, true)
                        this.addResource(resources, source.addingResourcesMode, {onSuccess})
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
                    const isPossibleToAddResources = this.isPossibleToAddResource(source.resources, source.addingResourcesMode)
                    if (source.resourcesToProvideCount >= edge.countOfResource && isPossibleToAddResources) {
                        const resources = source.takeCountResources(edge.countOfResource)
                        const onSuccess = () => this.writeToEdgeIsResourcesWereTransferred(edge, true)
                        this.addResource(resources, source.addingResourcesMode, {onSuccess})
                        this.writeToEdgeIsResourcesWereTransferred(edge, true)
                    }
                    this.writeToEdgeIsResourcesWereTransferred(edge, false)
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

    takeCountResources(count: number): IResource[] | undefined {
        if (!this.minCapacity || this.currentResourcesCount - count >= this.minCapacity) {
            const deletedResourcesToProvide = this.resourcesToProvide.splice(0, count);
            this._data = {
                ...this.data,
                resources: this.resources.filter(resource => {
                    return !deletedResourcesToProvide.some(deletedResource => deletedResource.id === resource.id)
                })
            }
            return deletedResourcesToProvide
        }
    }


    private pushAnyResources() {
        if (this.actionMode === ENodeAction.pushAny) {
            this.outgoingEdges.forEach(edge => {
                const source = edge.source;
                if (edge instanceof GraphDataEdge && source instanceof GraphDataNode) {
                    const isPossibleToAddResources = source.isPossibleToAddResource(this.resources, source.addingResourcesMode)
                    if (isPossibleToAddResources) {
                        const resources = this.takeCountResources(edge.countOfResource)
                        const onSuccess = () => edge.changeIsTransferredResources(true)
                        source.addResource(resources, source.addingResourcesMode, {onSuccess})
                    }
                }
            })
        }
    }

    private pushAllResources() {
        if (this.actionMode === ENodeAction.pushAll) {
            if (this.resourcesToProvideCount >= this.countOfRequiredOutgoingResources) {
                this.outgoingEdges.forEach(edge => {
                    const source = edge.source;
                    if (edge instanceof GraphDataEdge && source instanceof GraphDataNode) {
                        const isPossibleToAddResources = source.isPossibleToAddResource(this.resources, source.addingResourcesMode)
                        if (isPossibleToAddResources) {
                            const resources = this.takeCountResources(edge.countOfResource)
                            const onSuccess = () => edge.changeIsTransferredResources(true)
                            source.addResource(resources, source.addingResourcesMode, {onSuccess})
                        }
                    }
                })
            }
        }

    }

    private pullAllOrAnyResourcesFromSource() {
        if (this.actionMode === ENodeAction.pullAll || this.actionMode === ENodeAction.pullAny) {
            this.edgesFromSources.forEach(edge => {
                const countOfResourceToGenerate = edge.countOfResource
                const source = edge.source;
                if (source instanceof GraphOriginNode) {
                    const generatedResources = source.generateResourceFromSource(countOfResourceToGenerate)
                    const onSuccess = () => this.writeToEdgeIsResourcesWereTransferred(edge, true)
                    this.addResource(generatedResources, source.addingResourcesMode, {onSuccess})
                }
                this.writeToEdgeIsResourcesWereTransferred(edge, false)
            })
        }
    }

    private writeToEdgeIsResourcesWereTransferred(edge: GraphDataEdge, isTransferred: boolean) {
        if (edge instanceof GraphDataEdge) {
            edge.changeIsTransferredResources(isTransferred)
        }
    }

    static baseNodeIsData(baseNode: GraphBaseNode<IDiagramNodeBaseData>): baseNode is GraphDataNode {
        return baseNode instanceof GraphDataNode;
    }
}
