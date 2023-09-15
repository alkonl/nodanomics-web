import {GraphBaseEdge, GraphDataEdge} from "../../GraphEdge";
import {EModeAddResourcesToDataNode, IResource, isIGraphDataNode} from "../../../../interface";
import {generateResource} from "../../../diagram";

export class GraphResourceManager {
    private readonly incomingEdges: GraphBaseEdge[]
    private readonly outgoingEdges: GraphBaseEdge[]

    constructor({incomingEdges, outgoingEdges}: {
        incomingEdges: GraphBaseEdge[]
        outgoingEdges: GraphBaseEdge[]
    }) {
        this.incomingEdges = incomingEdges
        this.outgoingEdges = outgoingEdges
    }

    pullAny() {
        let gettingResources = 0
        const resources: IResource[] = []
        this.incomingEdges.forEach(edge => {
            const source = edge.source;
            if (edge instanceof GraphDataEdge && isIGraphDataNode(source)) {
                const resource = source.takeCountResources(edge.countOfResource)
                console.log('resource', resource)
                if (resource && resource.value > 0) {
                    resources.push(resource)
                    edge.changeIsTransferredResources(true, resource.value)
                }
                gettingResources += resource?.value || 0
            }
        })
        return {gettingResources, resources}
    }

    pullAll() {
        let gettingResources = 0
        const resources: IResource[] = []
        this.incomingEdges.forEach(edge => {
            const source = edge.source;
            if (edge instanceof GraphDataEdge && isIGraphDataNode(source)) {
                if (source.resourcesToProvideCount >= edge.countOfResource) {
                    const resource = source.takeCountResources(edge.countOfResource)
                    if (resource && resource.value > 0) {
                        edge.changeIsTransferredResources(true, resource.value)
                        resources.push(resource)
                    }
                    gettingResources += resource?.value || 0
                }
            }
        })
        return {gettingResources, resources}
    }

    generateResource(addingResourcesMode: EModeAddResourcesToDataNode) {
        this.edgesToData.forEach(edge => {
            if (isIGraphDataNode(edge.target)) {
                const resource = this.generateResourceFromSource(edge.countOfResource);
                const onSuccess = (resourcesValue: number) => {
                    edge.changeIsTransferredResources(true, resourcesValue)
                }
                edge.target.addResource(resource, {
                    mode: addingResourcesMode,
                    onSuccess
                });
            }
        })
    }

    pushResourcesToFirst(resources?: IResource) {
        console.log('resource', resources)
        if (resources) {
            const firstEdgeData = this.edgesToData[0]
            if (firstEdgeData) {
               this.pushResources(firstEdgeData, resources)
            }
        }
    }

    joinResources(resources: IResource[]): IResource {
        return resources.reduce((acc, resource) => {
            acc.value += resource.value
            return acc
        }, generateResource(0))
    }

    private pushResources(edge: GraphDataEdge, resource?: IResource) {
        if (isIGraphDataNode(edge.target) && resource) {
            const onSuccess = (resourcesValue: number) => {
                edge.changeIsTransferredResources(true, resourcesValue)
            }
            edge.target.addResource(resource, {
                onSuccess
            });
        }
    }

    private get edgesToData(): GraphDataEdge[] {
        return this.outgoingEdges
            .filter(edge => isIGraphDataNode(edge.target))
            .filter(edge => GraphDataEdge.baseEdgeIsData(edge)) as GraphDataEdge[];
    }

    private generateResourceFromSource(countOfResource: number) {
        return generateResource(countOfResource)
    }
}
