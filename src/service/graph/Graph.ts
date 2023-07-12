import {
    INodeData,
} from "../../interface";
import {GraphBaseNode, GraphNodeFactory} from "./GraphNodes";


export class Graph {
    private _nodes: GraphBaseNode[] = [];


    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
    }

    get nodes() {
        return this._nodes;
    }

    addOrGetNode(value: INodeData) {
        let node: GraphBaseNode | undefined = this.findNode(value.id);
        if (!node) {
            node = GraphNodeFactory.createNode(value);
            this.nodes.push(node);
        }
        return node;
    }

    findNode(id: string) {
        return this.nodes.find(node => node.data.id === id);
    }

    updateNode(id: string, data: Partial<INodeData>) {
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

    updateEdge({targetId, sourceId}: { sourceId: string, targetId: string }) {
        const source = this.findNode(sourceId);
        const target = this.findNode(targetId);
        if (source && target) {
            // source.updateEdge(target);
        }
    }
}
