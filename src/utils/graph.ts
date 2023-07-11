import {EDiagramNode, IFormulaNodeData, INodeData, IReactFlowNode} from "../interface";
// eslint-disable-next-line import/named
import {Node} from "reactflow";

// eslint-disable-next-line import/named

export class Edge {
    private _source: BaseNode;
    private _target: BaseNode;

    constructor(source: BaseNode, target: BaseNode) {
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

export class BaseNode<IGenericNodeData22 = INodeData, IGenericNodeData extends Node = Node<INodeData>> {
    private _data: IGenericNodeData;
    private _outgoingEdges: Edge[] = [];
    private _incomingEdges: Edge[] = [];


    constructor(value: IGenericNodeData) {
        this._data = value;
    }


    get data() {
        return this._data;
    }

    updateNode(data: Partial<IReactFlowNode>) {
        this._data = {
            ...this._data,
            ...data
        }
    }

    updateNodeData(data: Partial<INodeData>) {
        this._data = {
            ...this._data,
            data: {
                ...this._data.data,
                ...data
            }
        }
    }

    get outgoingEdges(): Edge[] {
        return this._outgoingEdges;
    }

    get incomingEdges(): Edge[] {
        return this._incomingEdges;
    }

    addEdge(target: BaseNode) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const edge = new Edge(this, target);
        this._outgoingEdges.push(edge);
        target._incomingEdges.push(edge);
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


export class FormulaNode extends BaseNode<IFormulaNodeData> {
    constructor(value: Node<IFormulaNodeData>) {
        super(value);
    }

    calculate() {
        console.log('calculate')
        const incoms = this.findIncomingEdges();
        const result = incoms.reduce((acc, edge) => {
            const source = edge.source;
            const sourceNode = source.data;
            if (sourceNode.data.type === EDiagramNode.Variable && sourceNode.data.value) {
                acc += sourceNode.data.value;
            }
            return acc;
        }, 0);
        this.updateNodeData({
            result: {type: 'number', value: result}
        });
        return result;
    }
}

export class NodeFactory {
    static createNode(value: IReactFlowNode): BaseNode {
        switch (value.data.type) {
            case EDiagramNode.Formula:
                return new FormulaNode(value);
            default:
                return new BaseNode(value);
        }
    }
}

export class Graph {
    private _nodes: BaseNode[] = [];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
    }

    get nodes() {
        return this._nodes;
    }

    addOrGetNode(value: IReactFlowNode) {
        let node: BaseNode | undefined = this.findNode(value.id);
        if (!node) {
            node = NodeFactory.createNode(value);
            this.nodes.push(node);
        }
        return node;
    }

    findNode(id: string) {
        return this.nodes.find(node => node.data.id === id);
    }

    updateNode(id: string, data: Partial<IReactFlowNode>) {
        const node = this.findNode(id);
        if (node) {
            node.updateNode(data);
        }
    }

    updateNodeData(id: string, data: Partial<INodeData>) {
        const node = this.findNode(id);
        if (node) {
            node.updateNodeData(data);
        }
    }

    addEdge({targetId, sourceId}: { sourceId: string, targetId: string }) {
        const source = this.findNode(sourceId);
        const target = this.findNode(targetId);
        if (source && target) {
            source.addEdge(target);
        }
    }

    serialize(): IReactFlowNode[] {
        return this.nodes.map(node => node.data);
    }
}
