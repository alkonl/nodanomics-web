import {IDiagramNodeBaseData, INodeData} from "../../../interface";
import {Edge} from "../Edge";

export abstract class GraphBaseNode<IGenericNodeData extends IDiagramNodeBaseData = INodeData> {
    private _data: IGenericNodeData;
    private _outgoingEdges: Edge[] = [];
    private _incomingEdges: Edge[] = [];


    constructor(value: IGenericNodeData) {
        this._data = value;
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
        this.updateOutgoingNodes();
    }

    updateOutgoingNodes() {
        this._outgoingEdges.forEach(edge => {
            edge.target.onParentUpdate();
        })
    }

    abstract onParentUpdate(): void

    get outgoingEdges(): Edge[] {
        return this._outgoingEdges;
    }

    get incomingEdges(): Edge[] {
        return this._incomingEdges;
    }

    addEdge(target: GraphBaseNode) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const edge = new Edge(this, target);
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
