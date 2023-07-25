import {GraphSourceNode} from "./GraphNodes/GraphSourceNode";
import {Graph} from "./Graph";
import {GraphPoolNode} from "./GraphNodes/GraphPoolNode";
import {GraphInvokableNode} from "./GraphNodes/GraphInvokable";
import {GraphFormulaNode} from "./GraphNodes";

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
        console.log('invokeStep', this.graph)
    }

    updateState() {
        const nodes = this.sortedNodes()
        nodes.forEach(node => {
            if (node instanceof GraphFormulaNode) {
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
