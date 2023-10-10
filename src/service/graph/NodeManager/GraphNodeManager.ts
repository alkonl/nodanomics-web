import {GraphBaseNode, GraphDataNode, GraphDatasetDatafieldNode} from "../GraphNodes";
import {isIResetAfterDiagramRun, isIResetNodeNoStoreProperties} from "../../../interface";
import {GraphWhileLoopNode} from "../GraphNodes/GraphWhileLoopNode";
import {GraphMicroLoopNode} from "../GraphNodes/GraphMicroLoopNode";

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


    deleteNode({nodeId}: { nodeId: string }) {
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
            if (isIResetNodeNoStoreProperties(node)) {

                node.resetNodeNoStoreProperties();
            }
        });
    }

    clear() {
        this._nodes = [];
    }

    includes(node: GraphBaseNode) {
        return this._nodes.includes(node);
    }

    getNodeByTag({tag}: { tag: string }) {
        return this._nodes.find(node => node.data.tag === tag && node instanceof GraphDatasetDatafieldNode);
    }

    has(node: GraphBaseNode) {
        return this._nodes.includes(node);
    }

    get assignedHistoryNode() {
        return this._nodes.find(node => node instanceof GraphDataNode && node.isAssigned) as GraphDataNode | undefined
    }

    get assignedNodeChanged(): boolean {
        return this.assignedHistoryNode?.isValueChanged || false
    }

    isChildOfAccumLoop(node: GraphBaseNode<any>): boolean {
        const parentId = node.data.parentId;
        if (parentId) {
            const parentNode = this.findById({nodeId: parentId});
            if(parentNode instanceof GraphWhileLoopNode || parentNode instanceof GraphMicroLoopNode && parentNode.data.isAccumulative){
                return true;
            }
        }
        return  false;
    }

    resetAfterDiagramRun() {
        this._nodes.forEach(node => {
            if (isIResetAfterDiagramRun(node)) {
                node.resetAfterDiagramRun();
            }
        });
    }
}
