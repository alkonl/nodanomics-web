import {GraphBaseNode} from "../abstracts";

export class GraphNodeManager {
    private _nodes: GraphBaseNode[] = [];

    get nodes() {
        return this._nodes;
    }

    add(node: GraphBaseNode) {
        this._nodes.push(node);
    }

    findById({nodeId}: {
        nodeId: string
             }): GraphBaseNode | undefined {
        return this._nodes.find(node => node.data.id === nodeId);

    }

    setNewNodes(nodes: GraphBaseNode[]) {
        this._nodes = nodes;
    }

    delete({nodeId}:{nodeId: string}) {
        const node = this.findById({nodeId});
        if (node) {
            node.delete();
        }
        this._nodes = this._nodes.filter(node => node.data.id !== nodeId);
    }
}
