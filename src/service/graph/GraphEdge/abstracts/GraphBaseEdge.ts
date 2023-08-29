import {GraphBaseNode} from "../../GraphNodes";
import {IDiagramConnectionBaseData, IDiagramConnectionData, INodeData} from "../../../../interface";

export abstract class GraphBaseEdge<IGenericEdgeData extends IDiagramConnectionBaseData =  IDiagramConnectionBaseData> {
    private _source: GraphBaseNode;
    private _target: GraphBaseNode;
    protected _data: IGenericEdgeData;

    protected constructor(
        source: GraphBaseNode,
        target: GraphBaseNode,
        data: IGenericEdgeData,
    ) {
        this._source = source;
        this._target = target;
        this._data = data
    }


    get type() {
        return this.data.type;
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

    get targetMode() {
        return this.data.targetMode;
    }

    get sourceMode() {
        return this.data.sourceMode;
    }

    deleteFromNodes() {
        this._source.deleteEdge(this);
        this._target.deleteEdge(this);
    }

    // abstract invokeStep() : void

    updateEdge(data: Partial<IGenericEdgeData>) {
        this._data = {
            ...this._data,
            ...data,
        }
    }

    updateSourceAndTarget({source, target}: {
        source: GraphBaseNode,
        target: GraphBaseNode
    }) {
        this._data = {
            ...this._data,
            sourceId: source.data.id,
            targetId: target.data.id,
        }
        this._source.deleteEdge(this);
        this._target.deleteEdge(this);
        this._source = source;
        this._target = target;
        this._source.addEdge(this._target, this);
    }
}
