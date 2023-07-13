import {GraphBaseNode} from "../GraphNodes";
import {IDiagramConnectionBaseData, IDiagramConnectionData, IDiagramNodeBaseData} from "../../../interface";

export abstract class GraphBaseEdge<IGenericEdgeData extends IDiagramConnectionBaseData = IDiagramConnectionBaseData> {
    private _source: GraphBaseNode<IDiagramNodeBaseData>;
    private _target: GraphBaseNode<IDiagramNodeBaseData>;
    private _data: IGenericEdgeData;

    protected constructor(source: GraphBaseNode<IDiagramNodeBaseData>, target: GraphBaseNode<IDiagramNodeBaseData>, data: IGenericEdgeData) {
        this._source = source;
        this._target = target;
        this._data = data
    }

    get source() {
        return this._source;
    }

    get target() {
        return this._target;
    }

    get data() {
        return this._data;
    }

    invoke() {
        this._target.onEdgeInvoke(this);
        this._target.invokeOutgoingEdges();
    }

    updateEdge(data: Partial<IDiagramConnectionData>) {
        this._data = {
            ...this._data,
            ...data,
        }
    }

    // updateTarget() {
    //     this._target.onEdgeInvoke(this);
    // }
}
