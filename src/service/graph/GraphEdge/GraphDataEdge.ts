import {GraphBaseEdge} from "./GraphBaseEdge";
import {IDataConnectionData, IDiagramNodeBaseData, IResource} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";
import {GraphSourceNode} from "../GraphNodes/GraphSourceNode";
import {GraphPoolNode} from "../GraphNodes/GraphPoolNode";

export class GraphDataEdge extends GraphBaseEdge<IDataConnectionData> {

    private _resources: IResource[] = [];


    constructor(source: GraphBaseNode<IDiagramNodeBaseData>, target: GraphBaseNode<IDiagramNodeBaseData>, data: IDataConnectionData) {
        super(source, target, data);
    }

    invoke(incomingNode: GraphBaseNode<IDiagramNodeBaseData>) {
        this.generateResource(incomingNode);
        super.invoke(incomingNode);
    }

    private generateResource(fromNode: GraphBaseNode<IDiagramNodeBaseData>) {
        console.log('fromNode: ', fromNode)
        if (fromNode instanceof GraphSourceNode) {
            this.generateResourceFromSource();
        } else if (fromNode instanceof GraphPoolNode) {
            this.getResourceFromPool(fromNode)
        }
    }

    private getResourceFromPool(poolNode: GraphPoolNode) {
        this._resources = poolNode.takeCountResources(this.countOfResource)
    }

   // private transfer

    private generateResourceFromSource() {
        const countOfResource = this.countOfResource;
        this._resources = Array(countOfResource).fill(0).map(() => ({
            color: 'red',
        }))
    }

    get resources() {
        return this._resources;
    }

    get countOfResource() {
        return Number(this.data.formula);
    }

}
