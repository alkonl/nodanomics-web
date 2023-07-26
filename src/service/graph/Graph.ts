import {IDiagramConnectionData, INodeData,} from "../../interface";
import {GraphBaseNode, GraphNodeFactory, GraphNodeManager} from "./GraphNodes";
import {GraphBaseEdge, GraphEdgeFactory} from "./GraphEdge";
import {Optionalize} from "../../utils";
import {RunManager} from "./RunManager";


export class Graph {
    private readonly _nodeManager: GraphNodeManager = new GraphNodeManager();
    private _edges: GraphBaseEdge[] = [];
    private runManager?: RunManager;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
    }

    get nodes() {
        return this._nodeManager.nodes;
    }

    get nodesManager() {
        return this._nodeManager
    }

    get edges() {
        return this._edges;
    }

    attachRunManager(runManager: RunManager) {
        this.runManager = runManager;
    }

    addOrGetNode(value: INodeData) {
        let node: GraphBaseNode | undefined = this.findNode(value.id);
        if (!node) {
            if (this.runManager) {
                node = GraphNodeFactory.createNode(value, this.runManager, this);
                this.nodesManager.add(node);
            }
        }
        return node;
    }

    findNode(nodeId: string) {
        return this.nodesManager.findById({nodeId});
    }

    updateNodeData(id: string, data: Partial<INodeData>) {
        const node = this.findNode(id);
        if (node) {
            node.updateNode(data);
        }
    }

    updateEdgeData(edgeData: Optionalize<IDiagramConnectionData, 'id'>) {
        const edge = this.findEdge(edgeData.id);
        if (edge) {
            edge.updateEdge(edgeData);
        }
    }

    replaceEdgeData(edgeData: IDiagramConnectionData) {
        const oldEdge = this.findEdge(edgeData.id);

        if (oldEdge) {
            this.deleteEdge(oldEdge.data.id);
            this.addEdge({sourceId: oldEdge.source.data.id, targetId: oldEdge.target.data.id, edgeData});
        }
    }

    findEdge(id: string) {
        return this._edges.find(edge => edge.data.id === id);
    }

    addEdge({targetId, sourceId, edgeData}: { sourceId: string, targetId: string, edgeData: IDiagramConnectionData }) {
        const source = this.findNode(sourceId);
        const target = this.findNode(targetId);
        if (source && target) {
            const edge = GraphEdgeFactory.createEdge({source, target, edgeData});
            this._edges.push(edge);
            source.addEdge(target, edge);
        }
    }

    setDiagramElements({nodes, edges}: { nodes: INodeData[], edges: IDiagramConnectionData[] }) {
        this._edges = [];
        const runManager = this.runManager;
        if (runManager) {
            const newNodes = nodes.map(node =>
                GraphNodeFactory.createNode(node, runManager, this)
            )
            this.nodesManager.setNewNodes(newNodes);
            edges.forEach(edge => {
                if (edge.sourceId && edge.targetId) {
                    const source = this.findNode(edge.sourceId);
                    const target = this.findNode(edge.targetId);
                    if (source && target) {
                        const graphEdge = GraphEdgeFactory.createEdge({source, target, edgeData: edge});
                        this._edges.push(graphEdge);
                        source.addEdge(target, graphEdge);
                    }
                }
            })
        }
    }

    deleteEdge(id: string) {
        const edge = this.findEdge(id);
        if (edge) {
            edge.deleteFromNodes();
            const edgeToDeleteIndex = this._edges.findIndex(edge => edge.data.id === id);
            if (edgeToDeleteIndex !== -1) {
                this._edges.splice(edgeToDeleteIndex, 1);
            }
            // this._edges = this._edges.filter(edge => edge.data.id !== id);
        }
    }

    updateConnectionSourceAndTarget({edgeId, newSourceId, newTargetId}: {
        edgeId: string,
        newSourceId: string,
        newTargetId: string
    }) {
        const edge = this.findEdge(edgeId);
        const source = this.findNode(newSourceId);
        const target = this.findNode(newTargetId);
        if (edge && source && target) {
            edge.updateSourceAndTarget({source, target});
        }
    }

    deleteNode({nodeId}: {
        nodeId: string
    }) {
        this.nodesManager.delete({nodeId});
        const edgesToDelete = this._edges.filter(edge => edge.source.data.id === nodeId || edge.target.data.id === nodeId);
        edgesToDelete.forEach(edge => {
            this.deleteEdge(edge.data.id);
        })
    }


    updateNodesState(nodeData: INodeData[]) {
        nodeData.forEach(node => {
            const graphNode = this.findNode(node.id);
            if (graphNode) {
                graphNode.updateNode(node)
            }
        })
    }
}
