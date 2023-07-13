import {GraphSourceNode} from "./GraphNodes/GraphSourceNode";
import {GraphBaseNode} from "./GraphNodes";
import {IDiagramNodeBaseData} from "../../interface";
import {GraphBaseEdge} from "./GraphEdge";
import {Graph} from "./Graph";

export class RunManager {
    private graph: Graph

    constructor(graph: Graph) {
        this.graph = graph
    }

    private structureStep() {
        const edgesArrayOfSource = this.graph.edges.filter(edge => edge.source instanceof GraphSourceNode)
        const sourceEdges = this.graph.edges.filter(edge => edge.source instanceof GraphSourceNode)
        const edgesArrayOfSourceChildEdges = sourceEdges.map(edge => {
            return this.recursiveGetChildEdges(edge.target)
        })
        return [...edgesArrayOfSourceChildEdges.flat().reverse(), ...edgesArrayOfSource.reverse() ]
    }

    recursiveGetChildEdges(node: GraphBaseNode<IDiagramNodeBaseData>, edges: GraphBaseEdge[] = []) {
        edges.push(...node.outgoingEdges)
        node.outgoingEdges.forEach(edge => {
            this.recursiveGetChildEdges(edge.target, edges)
        })
        return edges
    }


    invokeStep() {
        const structuredEdges = this.structureStep()
        structuredEdges.forEach(edge => {
            edge.invokeStep()
        })
    }

}
