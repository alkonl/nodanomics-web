import {ISourceNodeData} from "../../../interface";
import {GraphInteractiveNode} from "./GraphInteractiveNode";
import {GraphPoolNode} from "./GraphPoolNode";
import {GraphDataEdge} from "../GraphEdge";
import {RunManager} from "../RunManager";

let resourceId = 0;
const genResourceId = () => `resource_${resourceId++}`

export class GraphSourceNode extends GraphInteractiveNode<ISourceNodeData> {
    constructor(data: ISourceNodeData, runManager: RunManager) {
        super(data, runManager);
    }

    protected runAction() {
        this.pushAllOrAnyResources()
    }

    pushAllOrAnyResources() {
        console.log(this.edgesToPools)
        this.edgesToPools.forEach(edge => {
            const resources = this.generateResourceFromSource(edge.countOfResource);
            if (GraphPoolNode.baseNodeIsPool(edge.target)) {
                edge.target.addResource(resources);
            }
        })
    }

    get edgesToPools(): GraphDataEdge[] {
        return this.outgoingEdges
            .filter(edge => GraphPoolNode.baseNodeIsPool(edge.target))
            .filter(edge => GraphDataEdge.baseEdgeIsData(edge)) as GraphDataEdge[];
    }

    generateResourceFromSource(countOfResource: number) {
        return Array(countOfResource).fill(0).map(() => ({
            color: 'red',
            id: genResourceId(),
        }))
    }
}
