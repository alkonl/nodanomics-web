import {
    IDiagramNodeBaseData,
    INodeData
} from "../../../interface";
import {GraphBaseEdge} from "../GraphEdge";
import {RunManager} from "../RunManager";

export abstract class GraphBaseNode<IGenericNodeData extends IDiagramNodeBaseData = INodeData> {
    protected _data: IGenericNodeData;
    private _outgoingEdges: GraphBaseEdge[] = [];
    private _incomingEdges: GraphBaseEdge[] = [];
    private readonly RunManager: RunManager;

    constructor(value: IGenericNodeData, runManager: RunManager) {
        this._data = value;
        this.RunManager = runManager
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

    get runManager() {
        return this.RunManager;
    }

    get currentStep() {
        return this.runManager.currentStep;
    }

    get outgoingEdges(): GraphBaseEdge[] {
        return this._outgoingEdges;
    }

    get incomingEdges(): GraphBaseEdge[] {
        return this._incomingEdges;
    }

    addEdge(target: GraphBaseNode, edge: GraphBaseEdge) {
        this._outgoingEdges.push(edge);
        target._incomingEdges.push(edge);
    }

    replaceEdge({target, newEdge, oldEdge}: {
        target: GraphBaseNode, newEdge: GraphBaseEdge, oldEdge: GraphBaseEdge
    }) {
        this.addEdge(target, newEdge);
        this._outgoingEdges = this._outgoingEdges.filter(e => e !== oldEdge);
        target._incomingEdges = target._incomingEdges.filter(e => e !== oldEdge);
    }

    findIncomingEdges() {
        return this._incomingEdges;
    }

}
