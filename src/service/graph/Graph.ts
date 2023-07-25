import {IDiagramConnectionData, INodeData,} from "../../interface";
import {GraphBaseNode, GraphNodeFactory} from "./GraphNodes";
import {GraphBaseEdge, GraphEdgeFactory} from "./GraphEdge";
import {Optionalize} from "../../utils";
import {RunManager} from "./RunManager";


export class Graph {
    private _nodes: GraphBaseNode[] = [];
    private _edges: GraphBaseEdge[] = [];
    private runManager?: RunManager;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
    }

    get nodes() {
        return this._nodes;
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
                node = GraphNodeFactory.createNode(value, this.runManager);
                this.nodes.push(node);
            }
        }
        return node;
    }

    findNode(id: string) {
        return this.nodes.find(node => node.data.id === id);
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
            const newEdge = GraphEdgeFactory.createEdge({
                source: oldEdge.source,
                target: oldEdge.target,
                edgeData
            });
            oldEdge.source.replaceEdge({target: newEdge.target, newEdge, oldEdge});
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
            this._nodes = nodes.map(node => GraphNodeFactory.createNode(node, runManager));
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
        console.log(`delete edge: ${id}`, edge)
        if (edge) {
            edge.deleteFromNodes();
            this._edges = this._edges.filter(edge => edge.data.id !== id);
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
        const node = this.findNode(nodeId);
        if (node) {
            this._nodes = this._nodes.filter(node => node.data.id !== nodeId);
            node.delete();
            this._edges = this._edges.filter(edge => edge.source.data.id !== nodeId && edge.target.data.id !== nodeId);
        }
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
