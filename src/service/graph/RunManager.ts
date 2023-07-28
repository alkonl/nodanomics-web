import {Graph} from "./Graph";
import {
    GraphBaseNode,
    GraphInteractiveNode,
    GraphInvokableNode,
    GraphNodeManager,
    GraphSourceNode,
    GraphVariableNode
} from "./GraphNodes";
import {ENodeTrigger, isUpdateGraphNodeState} from "../../interface";
import {GraphEventListenerNode} from "./GraphNodes/GraphEventListenerNode";

export class RunManager {
    private graph: Graph
    private _currentStep = 0
    private invokedNodes: GraphNodeManager = new GraphNodeManager()

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
        this.invokeInitialStep()
        while (this.triggerNotExecutedNodes.length > 0) {
            this.invokeTriggeredNodes()
        }
        this.graph.nodes.forEach(node => {
            if (node instanceof GraphVariableNode) {
                node.updateRecoursesProvide()
            }
        })
        console.log('invokedNodes', this.invokedNodes.nodes.filter(node => node instanceof GraphEventListenerNode))
        this.invokedNodes.clear()
    }

    private invokeInitialStep() {
        const sortedNodes = this.graph.nodes.filter(node => {
            if (node instanceof GraphInteractiveNode) {
                if (node.triggerMode === ENodeTrigger.enabling) {
                    return node.isTriggeredIncomingNodes
                }
                return true
            } else if (node instanceof GraphEventListenerNode) {
                return  false
            }
            return true
        })
        sortedNodes.forEach(node => {
            if (node instanceof GraphInvokableNode) {
                node.invokeStep()
                this.invokedNodes.add(node)
            }
        })
        this.invokeTriggerEventListeners()
    }

    invokeTriggeredNodes() {
        const newTriggeredNodes = this.triggeredNodes.filter(node => !this.invokedNodes.nodes.includes(node))
        newTriggeredNodes.forEach(node => {
            if (node instanceof GraphInvokableNode && !this.invokedNodes.nodes.includes(node)) {
                this.invokedNodes.add(node)
                node.invokeStep()
            }
        })
        this.updateState()
        this.invokeTriggerEventListeners()
    }

    private invokeTriggerEventListeners() {
        this.triggerEventListeners.forEach(node => {
            if(node.checkIsEventTriggered() && !this.invokedNodes.nodes.includes(node)){
                node.invokeStep()
                this.invokedNodes.add(node)
            }
        })
    }


    get triggeredNodes() {
        const nodes = this.graph.nodes
        return nodes.filter(node => {
            if (node instanceof GraphInteractiveNode && node.triggerMode === ENodeTrigger.enabling) {
                return node.isTriggeredIncomingNodes
            }
        })
    }

    get triggerEventListeners(): GraphEventListenerNode[] {
        return this.graph.nodes.filter(node => node instanceof GraphEventListenerNode) as GraphEventListenerNode[]
    }

    updateState() {
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

    private get triggerNotExecutedNodes() {
        return this.triggeredNodes.filter(node => !this.invokedNodes.includes(node) )
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
