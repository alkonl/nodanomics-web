import {GraphBaseNode} from "./GraphNodes";

export class Edge {
    private _source: GraphBaseNode;
    private _target: GraphBaseNode;

    constructor(source: GraphBaseNode, target: GraphBaseNode) {
        this._source = source;
        this._target = target;
    }

    get source() {
        return this._source;
    }

    get target() {
        return this._target;
    }
}
