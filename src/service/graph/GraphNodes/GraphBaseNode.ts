import {
    IDiagramNodeBaseData,
    INodeData
} from "../../../interface";
import {GraphBaseEdge} from "../GraphEdge";

export abstract class GraphBaseNode<IGenericNodeData extends IDiagramNodeBaseData = INodeData> {
    protected _data: IGenericNodeData;
    private _outgoingEdges: GraphBaseEdge[] = [];
    private _incomingEdges: GraphBaseEdge[] = [];

    constructor(value: IGenericNodeData) {
        this._data = value;
    }

    invokeStepOutgoingEdges() {
        this._outgoingEdges.forEach(edge => {
            edge.invokeStep()
        })
    }

    get data() {
        return this._data;
    }

    updateNode(data: Partial<INodeData>) {
        this._data = {
            ...this._data,
            ...data
        }
    }

    updateNodeData(data: Partial<INodeData>) {
        this.updateNode(data)
    }

    get outgoingEdges(): GraphBaseEdge[] {
        return this._outgoingEdges;
    }

    addEdge(target: GraphBaseNode, edge: GraphBaseEdge) {
        this._outgoingEdges.push(edge);
        target._incomingEdges.push(edge);
    }

    findIncomingEdges() {
        return this._incomingEdges;
    }

}
