import {
    EModeAddResourcesToDataNode,
    ENodeAction,
    IDataNodeData,
    IDiagramNodeBaseData,
    IGetNodeExternalValue,
    IIsEventConditionMet,
    IResetNodeNoStoreProperties,
    IResource,
    ITriggeredEvent,
    IUpdateGraphNodeState,
    IUpdateGraphNodeStatePerStep,
    IUpdateStatePerNodeUpdate
} from "../../../interface";
import {GraphDataEdge} from "../GraphEdge";
import {GraphBaseNode, GraphInteractiveNode} from "./abstracts";
import {GraphOriginNode} from "./GraphOriginNode";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";
import {GraphHistoryManager} from "../GraphHistoryManager";

export class GraphDataNode extends GraphInteractiveNode<IDataNodeData>
    implements IUpdateGraphNodeState, IGetNodeExternalValue,
        IUpdateGraphNodeStatePerStep, ITriggeredEvent, IIsEventConditionMet,
        IResetNodeNoStoreProperties, IUpdateStatePerNodeUpdate {

    // private _resourcesToProvide: IResource[]
    private previousStepResourcesCount?: number
    private currentStepResourcesCount?: number
    private historyManager: GraphHistoryManager = new GraphHistoryManager(this);

    constructor(data: IDataNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(data, runManager, nodeManager);

    }

    private get _resourcesToProvide(): IResource {
        return this.data.resourcesToProvide
    }

    get isAssigned(): boolean {
        return this.data.isAssigned || false
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
        return this._resourcesToProvide.value;
    }

    get maxResources() {
        return this.historyManager.max
    }


    get minResources() {
        return this.historyManager.min
    }

    get currentResourcesCount() {
        return this.data.resources.value;
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

    resetNodeNoStoreProperties() {
        this.currentStepResourcesCount = undefined
        this.previousStepResourcesCount = undefined
    }


    updateStatePerStep() {
        if (!this.isAnyAssignedHistoryNode) {
            this.updateResourcesCountHistory()
        }
        this.updatePreviousResourcesCount()
    }

    addResource(resources: IResource, mode?: EModeAddResourcesToDataNode, params?: {
        onSuccess?: (resourcesCount: number) => void,
    }) {
        const updatedResources = this.addResourceWithCapacity(resources, mode)
        const isAdded = updatedResources !== undefined;
        if (isAdded && params?.onSuccess) {
            params.onSuccess(resources.value)
        }
    }

    isPossibleToAddResource(resources: IResource, mode: EModeAddResourcesToDataNode) {
        if (!this.maxCapacity) {
            return true;
        }
        if (mode === EModeAddResourcesToDataNode.onlyAll) {
            return this.currentResourcesCount + resources.value <= this.maxCapacity
        } else if (mode === EModeAddResourcesToDataNode.asPossible) {
            return this.currentResourcesCount + resources.value <= this.maxCapacity
        }
    }

    get eventName() {
        return `${this.data.tag}.OnValueChanged`
    }

    get isEventConditionMet() {
        return this.isValueChanged
    }

    getTriggeredEvent() {
        if (this.isValueChanged) {
            return this.eventName
        }
    }

    updateStatePerNodeUpdate() {
        if (this.isAnyAssignedHistoryNode) {
            this.updateResourcesCountHistory()
        }
    }

    get isExecutedChangesPerStep() {
        const isAssignedNodeChanged = this.isAssigned && this.isValueChanged
        if(isAssignedNodeChanged){
            const changeCount = this.data.changeCount || 0
            this.updateNode({changeCount: changeCount + 1})
        }
        return isAssignedNodeChanged
    }

    private get isAnyAssignedHistoryNode() {
        return this.nodeManager.nodes.find(node => node instanceof GraphDataNode && node.isAssigned)
    }

    private get isValueChanged() {
        return this.previousStepResourcesCount !== this.currentStepResourcesCount
    }

    private addResourceWithCapacity(resources?: IResource, mode?: EModeAddResourcesToDataNode): IDataNodeData | undefined {
        if (resources && resources.value > 0) {
            if (!this.maxCapacity) {
                return this.addResourcesToNode(resources)
            } else if (mode === EModeAddResourcesToDataNode.onlyAll && this.currentResourcesCount + resources?.value <= this.maxCapacity) {
                return this.addResourcesToNode(resources)
            } else if (mode === EModeAddResourcesToDataNode.asPossible) {
                const countOfResourcesToAdd = this.maxCapacity - this.currentResourcesCount;
                const resourcesToAdd = {
                    value: resources.value - countOfResourcesToAdd
                }
                return this.addResourcesToNode(resourcesToAdd)
            }
        }

    }

    private updateResourcesToProvide() {
        this.updateNode({
            resourcesToProvide: {
                ...this.data.resources
            }
        })
    }

    private addResourcesToNode(resource: IResource) {
        this.updateResourcesToProvide()
        this.updateNode({
            resources: {
                value: this.currentResourcesCount + resource.value
            }
        })
        this.updatePreviousResourcesCount()
        return this.data
    }

    private updateResourcesCountHistory() {
        const numToWrite = this.currentResourcesCount
        this.historyManager.updateHistory(numToWrite)
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


    private updatePreviousResourcesCount() {
        if (this.currentResourcesCount > 0) {
            this.previousStepResourcesCount = this.currentStepResourcesCount
            this.currentStepResourcesCount = this.currentResourcesCount
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
                        if (resources) {
                            const onSuccess = (resourceCount: number) => {
                                edge.changeIsTransferredResources(true, resourceCount)
                            }
                            this.addResource(resources, source.addingResourcesMode, {onSuccess})
                        }

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
                        if (resources) {
                            const onSuccess = (resourceCount: number) => {
                                edge.changeIsTransferredResources(true, resourceCount)
                            }
                            this.addResource(resources, source.addingResourcesMode, {onSuccess})
                        }
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

    takeCountResources(count: number): IResource | undefined {
        const afterTakeResources = this.resourcesToProvideCount - count
        if (afterTakeResources >= 0 && (!this.minCapacity || afterTakeResources >= this.minCapacity)) {
            const deletedResourcesToProvide = {
                ...this.resourcesToProvide,
                value: count
            }
            const leftResourcesToProvide = {
                ...this.resourcesToProvide,
                value: afterTakeResources
            }

            const leftResources = {
                ...this.resources,
                value: this.currentResourcesCount - count
            }

            this.updatePreviousResourcesCount()
            this._data = {
                ...this.data,
                resourcesToProvide: leftResourcesToProvide,
                resources: leftResources
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
                        if (resources) {
                            const onSuccess = (resourcesCount: number) =>
                                edge.changeIsTransferredResources(true, resourcesCount)
                            source.addResource(resources, source.addingResourcesMode, {onSuccess})
                        }
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
                            if (resources) {
                                const onSuccess = (resourceCount: number) => {
                                    edge.changeIsTransferredResources(true, resourceCount)
                                }
                                source.addResource(resources, source.addingResourcesMode, {onSuccess})
                            }
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
                    const onSuccess = (resourceCount: number) => {
                        edge.changeIsTransferredResources(true, resourceCount)
                    }
                    this.addResource(generatedResources, source.addingResourcesMode, {onSuccess})
                }
            })
        }
    }

    static baseNodeIsData(baseNode: GraphBaseNode<IDiagramNodeBaseData>): baseNode is GraphDataNode {
        return baseNode instanceof GraphDataNode;
    }
}
