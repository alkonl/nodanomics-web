import {
    IDiagramConnectionBaseData,
    IDiagramNodeBaseData,
    INodeData
} from "../../../interface";
import {GraphBaseEdge} from "../GraphEdge/GraphBaseEdge";

export abstract class GraphBaseNode<IGenericNodeData extends IDiagramNodeBaseData = INodeData> {
    protected _data: IGenericNodeData;
    private _outgoingEdges: GraphBaseEdge[] = [];
    private _incomingEdges: GraphBaseEdge[] = [];


    constructor(value: IGenericNodeData) {
        this._data = value;
    }

    invokeOutgoingEdges(){
        this._outgoingEdges.forEach(edge => {
            edge.invoke()
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

    updateOutgoingNodes() {
        this._outgoingEdges.forEach(edge => {
            edge.target.onParentUpdate();
        })
    }

    abstract onParentUpdate(): void


    abstract onEdgeInvoke(edge: GraphBaseEdge<IDiagramConnectionBaseData>): void



    get outgoingEdges(): GraphBaseEdge[] {
        return this._outgoingEdges;
    }

    get incomingEdges(): GraphBaseEdge[] {
        return this._incomingEdges;
    }

    addEdge(target: GraphBaseNode, edge: GraphBaseEdge) {
        this._outgoingEdges.push(edge);
        target._incomingEdges.push(edge);
        target.onParentUpdate()
    }


    findOutgoingEdge(targetId: string) {
        return this._outgoingEdges.find(edge => edge.target._data.id === targetId);
    }

    findIncomingEdges() {
        return this._incomingEdges;
    }

    getChildNodes() {
        return this._outgoingEdges.map(edge => edge.target);
    }
}
