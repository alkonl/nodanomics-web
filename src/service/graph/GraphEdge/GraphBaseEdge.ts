import {GraphBaseNode} from "../GraphNodes";
import {IDiagramConnectionBaseData, IDiagramConnectionData, IDiagramNodeBaseData} from "../../../interface";
import {RunManager} from "../Graph";

export abstract class GraphBaseEdge<IGenericEdgeData extends IDiagramConnectionBaseData = IDiagramConnectionBaseData> {
    private _source: GraphBaseNode<IDiagramNodeBaseData>;
    private _target: GraphBaseNode<IDiagramNodeBaseData>;
    private _data: IGenericEdgeData;
    private _renderGraph: RunManager;

    protected constructor(
        source: GraphBaseNode<IDiagramNodeBaseData>,
        target: GraphBaseNode<IDiagramNodeBaseData>,
        data: IGenericEdgeData,
        renderGraph: RunManager,
    ) {
        this._source = source;
        this._target = target;
        this._data = data
        this._renderGraph = renderGraph;
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

    invokeStep() {
        this._target.onEdgeInvoke(this);
    }

    updateEdge(data: Partial<IDiagramConnectionData>) {
        this._data = {
            ...this._data,
            ...data,
        }
    }
}
