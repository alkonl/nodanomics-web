import {Graph} from "./Graph";
import {GraphInteractiveNode, GraphInvokableNode, GraphVariableNode} from "./GraphNodes";
import {EDiagramNode, ENodeTrigger, isUpdateGraphNodeState} from "../../interface";

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
            if (isUpdateGraphNodeState(node)) {
                node.updateState()
            }
        })
        const newTriggeredNodes = this.triggeredNodes.filter(node => !sortedNodes.includes(node))
        newTriggeredNodes.forEach(node => {
            if (node instanceof GraphInvokableNode) {
                node.invokeStep()
            }
            if (isUpdateGraphNodeState(node)) {
                node.updateState()
            }
        })
    }


    get triggeredNodes() {
        const nodes = this.sortedNodes()
        return nodes.filter(node => {
            if (node instanceof GraphInteractiveNode && node.triggerMode === ENodeTrigger.enabling) {
                return node.isTriggeredIncomingNodes
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

    private readonly executedOrder: {
        [key in EDiagramNode]?: number
    } = {
        [EDiagramNode.Source]: 1,
        [EDiagramNode.EventTrigger]: 2,
        [EDiagramNode.EventListener]: 3,

    }

    private sortedNodes() {
        // sort by executedOrder
        const nodes = this.graph.nodes
        const sortedNodes = nodes.filter(node => {
            return !(node instanceof GraphVariableNode)
        }).filter(node => {
            return !(node instanceof GraphInteractiveNode && node.triggerMode === ENodeTrigger.enabling && !node.isTriggeredIncomingNodes)
        }).sort((a, b) => {
            const aOrder = this.executedOrder[a.data.type] || 10
            const bOrder = this.executedOrder[b.data.type] || 10
            return aOrder - bOrder
        })
        const variableNodes = this.sortedVariableNodes
        return [...variableNodes, ...sortedNodes]
    }

    private get sortedVariableNodes() {
        const nodes = this.graph.nodes
        const startedVariableNodes: GraphVariableNode[] = nodes.filter(node => {
            if (node instanceof GraphVariableNode) {
                return node.isSourceInIncomingEdges
            }
        }) as GraphVariableNode[]
        const allVariableNodes: GraphVariableNode[] = []
        startedVariableNodes.forEach(variableNode => {
            if (!allVariableNodes.includes(variableNode)) {
                allVariableNodes.unshift(variableNode)
            }
        })
        startedVariableNodes.map(variableNode => {
            return this.getVariableNodesChildrenRecursive(variableNode, allVariableNodes)
        })
        return allVariableNodes.flat()
    }

    private getVariableNodesChildren(variableNode: GraphVariableNode) {
        const children = variableNode.outgoingEdges.map(edge => edge.target)
        return children as GraphVariableNode[]
    }

    private getVariableNodesChildrenRecursive(variableNode: GraphVariableNode, children: GraphVariableNode[]) {
        const variableNodes = this.getVariableNodesChildren(variableNode)
        variableNodes.forEach(child => {
            if (!children.includes(child)) {
                children.unshift(child)
            }
        })
        variableNodes.forEach(child => {
            if (child instanceof GraphVariableNode) {
                this.getVariableNodesChildrenRecursive(child, children)
            }
        })
        return children
    }
}
