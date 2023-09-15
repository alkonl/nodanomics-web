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

    pushAny(addingResourcesMode: EModeAddResourcesToDataNode) {
        this.edgesToVariables.forEach(edge => {
            if (isIGraphDataNode(edge.target)) {
                const resource = this.generateResourceFromSource(edge.countOfResource);
                const onSuccess = (resourcesValue: number) => {
                    edge.changeIsTransferredResources(true, resourcesValue)
                }
                edge.target.addResource(resource, addingResourcesMode, {
                    onSuccess
                });
            }
        })
    }

    private get edgesToVariables(): GraphDataEdge[] {
        return this.outgoingEdges
            .filter(edge => isIGraphDataNode(edge.target))
            .filter(edge => GraphDataEdge.baseEdgeIsData(edge)) as GraphDataEdge[];
    }

    private generateResourceFromSource(countOfResource: number) {
        return generateResource(countOfResource)
    }
}
