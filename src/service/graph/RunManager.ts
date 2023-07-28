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

    updateState() {
        const nodes = this.graph.nodes
        nodes.forEach(node => {
            if (isUpdateGraphNodeState(node)) {
                node.updateState()
            }
        })
    }

    invokeStep() {
        this.incrementStep()
        this.invokeInitialStep()
        this.graph.nodes.forEach(node => {
            if (node instanceof GraphVariableNode) {
                node.updateRecoursesProvide()
            }
        })
    }

    private invokeInitialStep() {
        const nodesToInitialInvocation = this.graph.nodes.filter(node => {
            if(!(node instanceof GraphInvokableNode)){
                return false
            }
            if (node instanceof GraphInteractiveNode) {
                if (node.triggerMode === ENodeTrigger.enabling) {
                    return node.isTriggeredIncomingNodes
                }
                return true
            } else if (node instanceof GraphEventListenerNode) {
                return false
            }
            return true
        }) as GraphInvokableNode[]

        nodesToInitialInvocation.forEach(node => {
                node.invokeStep()
        })
        this.invokeTriggerEventListeners()
    }

    private invokeTriggerEventListeners() {
        this.triggerEventListeners.forEach(node => {
            if (node.checkIsEventTriggered()) {
                node.invokeStep()
            }
        })
    }

    get triggerEventListeners(): GraphEventListenerNode[] {
        return this.graph.nodes.filter(node => node instanceof GraphEventListenerNode) as GraphEventListenerNode[]
    }


    private incrementStep() {
        this._currentStep++
    }

    // maybe not needed
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

    // maybe not needed
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

    // maybe not needed
    private getNodesChildren(node: GraphBaseNode) {
        const children = node.outgoingEdges.map(edge => edge.target)
        return children as GraphBaseNode[]
    }
}
