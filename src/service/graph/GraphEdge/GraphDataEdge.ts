import {GraphBaseEdge} from "./GraphBaseEdge";
import {IDataConnectionData, IDiagramNodeBaseData, IResource} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";
import {GraphSourceNode} from "../GraphNodes/GraphSourceNode";
import {GraphPoolNode} from "../GraphNodes/GraphPoolNode";

let resourceId = 0;
const genResourceId = () => `resource_${resourceId++}`

export class GraphDataEdge extends GraphBaseEdge<IDataConnectionData> {


    constructor(
        source: GraphBaseNode<IDiagramNodeBaseData>,
        target: GraphBaseNode<IDiagramNodeBaseData>,
        data: IDataConnectionData,
    ) {
        super(source, target, data);
    }

    invokeStep() {
        console.log('invokeStep', this)
        this.provideResources();
    }

    private provideResources() {
        let resources: IResource[] | undefined;
        if (this.source instanceof GraphSourceNode) {
            resources = this.generateResourceFromSource();
        } else if (this.source instanceof GraphPoolNode) {
            resources = this.provideResourceFromPool();
        }
        if (this.target instanceof GraphPoolNode) {
            this.target.addResource(resources)
        }
    }

    private provideResourceFromPool() {
        if(this.source instanceof GraphPoolNode) {
            return this.source.takeCountResources(this.countOfResource)
        }
        return [];
    }

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
