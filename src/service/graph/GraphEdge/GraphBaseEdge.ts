import {GraphBaseNode} from "../GraphNodes";
import {EElementType, IDiagramConnectionBaseData, IDiagramConnectionData} from "../../../interface";

export class GraphBaseEdge<IGenericEdgeData extends IDiagramConnectionBaseData = IDiagramConnectionData> {
    private _source: GraphBaseNode;
    private _target: GraphBaseNode;
    private _data: IGenericEdgeData;

    constructor(source: GraphBaseNode, target: GraphBaseNode, data: IGenericEdgeData) {
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

    updateEdge(data: typeof this._data) {
        this._data = {
            ...this._data,
            ...data,
        }
    }
}
