import {GraphBaseNode, GraphDataNode} from "../GraphNodes";
import {GraphDatasetDatafieldNode} from "../GraphNodes/GraphDatasetDatafieldNode";

export class GraphNodeManager {
    private _nodes: GraphBaseNode[] = [];

    get nodes() {
        return this._nodes;
    }

    add(node: GraphBaseNode) {
        this._nodes.push(node);
    }

    addBulk(nodes: GraphBaseNode[]) {
        this._nodes = this._nodes.concat(nodes);
    }

    findById({nodeId}: {
        nodeId: string
             }): GraphBaseNode | undefined {
        return this._nodes.find(node => node.data.id === nodeId);

    }

    // setNewNodes(nodes: GraphBaseNode[]) {
    //     this._nodes = nodes;
    // }

    deleteNode({nodeId}:{nodeId: string}) {
        const node = this.findById({nodeId});
        if (node) {
            node.delete();
        }
        this._nodes = this._nodes.filter(node => node.data.id !== nodeId);
    }

    deleteNodeFromNodes(node: GraphBaseNode) {
        this._nodes = this._nodes.filter(nodeInNodes => nodeInNodes.data.id !== node.data.id);
    }

    resetResourcesToProvide() {
        this._nodes.forEach(node => {
            if (node instanceof GraphDataNode) {
                node.resetResourcesToProvide();
            }
        });
    }

    clear() {
        this._nodes = [];
    }

    includes(node: GraphBaseNode) {
        return this._nodes.includes(node);
    }

    getNodeByTag({tag}: {tag: string}) {
        return this._nodes.find(node => node.data.tag === tag && node instanceof GraphDatasetDatafieldNode);
    }

    has(node: GraphBaseNode) {
        return this._nodes.includes(node);
    }
}
