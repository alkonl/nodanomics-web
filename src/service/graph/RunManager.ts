import {Graph} from "./Graph";
import {GraphFormulaNode, GraphInvokableNode, GraphPoolNode, GraphSourceNode} from "./GraphNodes";
import {isUpdateGraphNodeState} from "../../interface";

export class RunManager {
    private graph: Graph
    private _currentStep = 0

    constructor(graph: Graph) {
        this.graph = graph
    }

    get currentStep() {
        return this._currentStep
    }

    invokeStep() {
        this.incrementStep()
        const nodes = this.sortedNodes()
        nodes.forEach(node => {
            if (node instanceof GraphInvokableNode) {
                node.invokeStep()
            }
        })
    }

    updateState() {
        const nodes = this.sortedNodes()
        nodes.forEach(node => {
            if (isUpdateGraphNodeState(node)) {
                node.updateState()
            }
        })
    }

    private incrementStep() {
        this._currentStep++
    }

    private sortedNodes() {
        const nodes = this.graph.nodes
        const sourceNodes = nodes.filter(node => node instanceof GraphSourceNode)
        const poolNodes = nodes.filter(node => node instanceof GraphPoolNode)
        const otherNodes = nodes.filter(node => !(node instanceof GraphPoolNode) && !(node instanceof GraphSourceNode))
        return [...otherNodes, ...sourceNodes, ...poolNodes].reverse()
    }

}
