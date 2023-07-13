import {GraphBaseEdge} from "./GraphBaseEdge";
import {IDataConnectionData, IDiagramNodeBaseData, IResource} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";

export class GraphDataEdge extends GraphBaseEdge<IDataConnectionData> {

    private _resources: IResource[] = [];

    constructor(source: GraphBaseNode<IDiagramNodeBaseData>, target: GraphBaseNode<IDiagramNodeBaseData>, data: IDataConnectionData) {
        super(source, target, data);
    }

    invoke() {
        this.generateResource();
        super.invoke();
    }

    private generateResource() {
        const countOfResource = Number(this.data.formula);
        this._resources = Array(countOfResource).fill(0).map(() => ({
           color: 'red',
        }))
    }

    get resources() {
        return this._resources;
    }

}
