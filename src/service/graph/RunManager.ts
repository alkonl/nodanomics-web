import {Graph} from "./Graph";
import {
    GraphBaseNode,
    GraphInteractiveNode,
    GraphInvokableNode,
    GraphSourceNode,
    GraphVariableNode
} from "./GraphNodes";
import {ENodeTrigger, isUpdateGraphNodeState} from "../../interface";
import {GraphEventListenerNode} from "./GraphNodes/GraphEventListenerNode";

export class RunManager {
    private graph: Graph
    private _currentStep = 0

    constructor(graph: Graph) {
        this.graph = graph
    }

    get currentStep() {
        return this._currentStep
    }

    resetCurrentStep() {
        this._currentStep = 0
    }

    invokeStep() {
        this.incrementStep()
        // const sortedNodes = this.sortedNodes()
        const sortedNodes = this.graph.nodes.filter(node => {
            if (node instanceof GraphInteractiveNode) {
                if (node.triggerMode === ENodeTrigger.enabling) {
                    return node.isTriggeredIncomingNodes
                }
                return true
            }
            return true
        })

        sortedNodes.forEach(node => {
            if (node instanceof GraphInvokableNode) {
                node.invokeStep()
            }
        })

        this.triggerListeners.forEach(node => {
            if (node instanceof GraphEventListenerNode) {
                node.invokeStep()
            }
        })
        const newTriggeredNodes = this.triggeredNodes.filter(node => !sortedNodes.includes(node))
        newTriggeredNodes.forEach(node => {
            if (node instanceof GraphInvokableNode) {
                node.invokeStep()
            }
        })
        this.updateState()
        this.graph.nodes.forEach(node => {
            if (node instanceof GraphVariableNode) {
                node.updateRecoursesProvide()
            }
        })
    }


    get triggeredNodes() {
        // const nodes = this.sortedNodes()
        const nodes = this.graph.nodes
        return nodes.filter(node => {
            if (node instanceof GraphInteractiveNode && node.triggerMode === ENodeTrigger.enabling) {
                return node.isTriggeredIncomingNodes
            }
        })
    }

    get triggerListeners() {
        return this.graph.nodes.filter(node => node instanceof GraphEventListenerNode)
    }

    updateState() {
        // const nodes = this.sortedNodes()
        const nodes = this.graph.nodes
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
        const startedSources = this.graph.nodes.filter(node => {
            if (node instanceof GraphSourceNode) {
                if (node.triggerMode === ENodeTrigger.enabling) {
                    return node.isTriggeredIncomingNodes
                }
                return node
            }
        }) as GraphSourceNode[]

        const sortedNodes = startedSources.map(source => {
            return this.getNodesChildrenRecursive(source)
        })
        return sortedNodes.flat()
    }

    private getNodesChildrenRecursive(node: GraphBaseNode, children: GraphBaseNode[] = [node]) {
        const nodes = this.getNodesChildren(node)
        nodes.forEach(child => {
            if (!children.includes(child)) {
                children.push(child)
            }
        })
        nodes.forEach(child => {
            if (child.outgoingEdges.length > 0) {
                this.getNodesChildrenRecursive(child, children)
            }
        })
        return children
    }

    private getNodesChildren(node: GraphBaseNode) {
        const children = node.outgoingEdges.map(edge => edge.target)
        return children as GraphBaseNode[]
    }

}
