import {Graph} from "./Graph";
import {GraphBaseNode, GraphInteractiveNode, GraphInvokableNode, GraphSourceNode} from "./GraphNodes";
import {EDiagramNode, ENodeTrigger, isUpdateGraphNodeState} from "../../interface";
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
        const sortedNodes = this.sortedNodes()
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
    }


    get triggeredNodes() {
        const nodes = this.sortedNodes()
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

    private readonly executedOrder: {
        [key in EDiagramNode]?: number
    } = {
        [EDiagramNode.Source]: 1,
        [EDiagramNode.EventTrigger]: 2,
        [EDiagramNode.EventListener]: 3,

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
