import {GraphSourceNode} from "./GraphNodes/GraphSourceNode";
import {Graph} from "./Graph";
import {GraphPoolNode} from "./GraphNodes/GraphPoolNode";

export class RunManager {
    private graph: Graph

    constructor(graph: Graph) {
        this.graph = graph
    }


    private sortedNodes() {
        const nodes = this.graph.nodes
        const sourceNodes = nodes.filter(node => node instanceof GraphSourceNode)
        const poolNodes = nodes.filter(node => node instanceof GraphPoolNode)
        const otherNodes = nodes.filter(node => !(node instanceof GraphPoolNode) && !(node instanceof GraphSourceNode))
        return [...sourceNodes, ...poolNodes, ...otherNodes].reverse()
    }

    invokeStep() {
        console.log('RunManager: ', this.graph)
        const nodes = this.sortedNodes()
        nodes.forEach(node => {
            node.invokeStepOutgoingEdges()
        })
    }

}
