import {IDiagramNodeBaseData, INodeData, IUpdateGraphNodeState} from "../../../../interface";
import {GraphBaseEdge} from "../../GraphEdge";
import {RunManager} from "../../RunManager";

export abstract class GraphBaseNode<IGenericNodeData extends IDiagramNodeBaseData = INodeData>
 implements IUpdateGraphNodeState{
    protected _data: IGenericNodeData;
    private readonly _outgoingEdges: GraphBaseEdge[] = [];
    private readonly _incomingEdges: GraphBaseEdge[] = [];
    private readonly RunManager: RunManager;

    constructor(value: IGenericNodeData, runManager: RunManager) {
        this._data = value;
        this.RunManager = runManager
    }


    updateState() {
        this.updateConnectedNodes();
    }


    get data() {
        return this._data;
    }


    updateNode(data: Partial<IGenericNodeData>) {
        this._data = {
            ...this._data,
            ...data
        }
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


    get outgoingNodes(): GraphBaseNode[] {
        return this._outgoingEdges.map(edge => edge.target);
    }

    get incomingEdges(): GraphBaseEdge[] {
        return this._incomingEdges;
    }

    addEdge(target: GraphBaseNode, edge: GraphBaseEdge) {
        if (!this.checkIfEdgeConnectedFromThisNodeToTargetNode(edge, target)) {
            this._outgoingEdges.push(edge);
            target._incomingEdges.push(edge);
            target.updateConnectedNodes()
            this.updateConnectedNodes();
        }
    }

    private checkIfEdgeConnectedFromThisNodeToTargetNode(edge: GraphBaseEdge, target: GraphBaseNode): boolean {
        return this._outgoingEdges.some(e => e.target === edge.target) && target._incomingEdges.some(e => e.source === edge.source);
    }


    deleteEdge(edge: GraphBaseEdge) {
        const outgoingEdgeIndex = this._outgoingEdges.findIndex(e => e === edge);
        const incomingEdgeIndex = this._incomingEdges.findIndex(e => e === edge);
        if (incomingEdgeIndex !== -1) {
            this._incomingEdges.splice(incomingEdgeIndex, 1);
        }
        if (outgoingEdgeIndex !== -1) {
            this._outgoingEdges.splice(outgoingEdgeIndex, 1);
        }
        this.updateConnectedNodes();
    }

    delete() {
        this._outgoingEdges.forEach(e => e.deleteFromNodes());
    }

    findIncomingEdges() {
        return this._incomingEdges;
    }

    updateConnectedNodes() {
        const outgoingNodeNames = this._outgoingEdges.map(e => e.target.data.name);
        const incomingNodeNames = this._incomingEdges.map(e => e.source.data.name);

        this._data = {
            ...this._data,
            connectedNodes: [...outgoingNodeNames, ...incomingNodeNames]
        }
    }
}
