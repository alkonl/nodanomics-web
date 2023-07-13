import {GraphBaseEdge} from "./GraphBaseEdge";
import {IDataConnectionData, IDiagramNodeBaseData, IResource} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";
import {GraphSourceNode} from "../GraphNodes/GraphSourceNode";
import {GraphPoolNode} from "../GraphNodes/GraphPoolNode";
import {RunManager} from "../Graph";

let resourceId = 0;
const genResourceId = () => `resource_${resourceId++}`

export class GraphDataEdge extends GraphBaseEdge<IDataConnectionData> {

    // private _resources: IResource[] = [];


    constructor(
        source: GraphBaseNode<IDiagramNodeBaseData>,
        target: GraphBaseNode<IDiagramNodeBaseData>,
        data: IDataConnectionData,
        renderGraph: RunManager,
    ) {
        super(source, target, data, renderGraph);
    }

    invokeStep() {
        this.provideResources();
        super.invokeStep();
    }

    private provideResources() {
        let resources: IResource[] = [];
        if (this.source instanceof GraphSourceNode) {
            resources = this.generateResourceFromSource();
        } else if (this.source instanceof GraphPoolNode) {
            resources = this.source.takeCountResources(this.countOfResource);
        }
        if (this.target instanceof GraphPoolNode) {
            this.target.addResource(resources)
        }
    }

    private getResourceFromPool(poolNode: GraphPoolNode) {
        return poolNode.takeCountResources(this.countOfResource)
    }

    // private transfer

    private generateResourceFromSource() {
        const countOfResource = this.countOfResource;
        return Array(countOfResource).fill(0).map(() => ({
            color: 'red',
            id: genResourceId(),
        }))
    }

    get countOfResource() {
        return Number(this.data.formula);
    }

}
