import {
    IDiagramConnectionData,
    INodeData, IReactFlowNode,
} from "../../interface";
import {GraphBaseNode, GraphNodeFactory} from "./GraphNodes";
import {GraphBaseEdge, GraphEdgeFactory} from "./GraphEdge";
import {Optionalize} from "../../utils";
import {GraphSourceNode} from "./GraphNodes/GraphSourceNode";

export class RunManager {

    private stepLimit = 100;
    private stepCount = 0;
    private graph: Graph
    constructor(graph: Graph) {
        this.graph = graph
    }


   invokeStep() {
        if (this.stepCount > this.stepLimit) {
            throw new Error('step limit reached')
        }
        this.stepCount++;
        this.graph.edges.forEach(edge => {
            edge.invokeStep()
        })
   }

}


export class Graph {
    private _nodes: GraphBaseNode[] = [];
    private _edges: GraphBaseEdge[] = [];
    private _runManager: RunManager = new RunManager(this);


    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
    }

    invokeStep() {
        console.log('graph invokeStep prev', this)
        this._runManager.invokeStep()
        console.log('graph invokeStep next', this)
    }

    get nodes() {
        return this._nodes;
    }

    get edges() {
        return this._edges;
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

    updateEdgeData(edgeData: Optionalize<IDiagramConnectionData, 'id'>) {
        const edge = this.findEdge(edgeData.id);
        if (edge) {
            edge.updateEdge(edgeData);
        }
    }

    findEdge(id: string) {
        return this._edges.find(edge => edge.data.id === id);
    }

    addEdge({targetId, sourceId, edgeData}: { sourceId: string, targetId: string, edgeData: IDiagramConnectionData }) {
        const source = this.findNode(sourceId);
        const target = this.findNode(targetId);
        console.log({
            source: source?.data.type, target: target?.data.type
        })
        if (source && target) {
            const edge = GraphEdgeFactory.createEdge({source, target, edgeData, renderGraph: this._runManager});
            this._edges.push(edge);
            source.addEdge(target, edge);
        }
    }
}
