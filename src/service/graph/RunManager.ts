import {Graph} from "./Graph";
import {GraphInteractiveNode, GraphInvokableNode, GraphPoolNode} from "./GraphNodes";
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
        })
        const newTriggeredNodes = this.triggeredNodes.filter(node => !sortedNodes.includes(node))
        newTriggeredNodes.forEach(node => {
            if (node instanceof GraphInvokableNode) {
                node.invokeStep()
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
            return !(node instanceof GraphPoolNode)
        }).filter(node => {
            return !(node instanceof GraphInteractiveNode && node.triggerMode === ENodeTrigger.enabling && !node.isTriggeredIncomingNodes)
        }).sort((a, b) => {
            const aOrder = this.executedOrder[a.data.type] || 10
            const bOrder = this.executedOrder[b.data.type] || 10
            return aOrder - bOrder
        })
        const poolNodes = this.sortedPoolNodes
        return [...poolNodes, ...sortedNodes]
    }

    private get sortedPoolNodes() {
        const nodes = this.graph.nodes
        const startedPoolNodes: GraphPoolNode[] = nodes.filter(node => {
            if (node instanceof GraphPoolNode) {
                return node.isSourceInIncomingEdges
            }
        }) as GraphPoolNode[]
        const allPoolNodes: GraphPoolNode[] = []
        startedPoolNodes.forEach(poolNode => {
            if (!allPoolNodes.includes(poolNode)) {
                allPoolNodes.unshift(poolNode)
            }
        })
        startedPoolNodes.map(poolNode => {
            return this.getPoolNodesChildrenRecursive(poolNode, allPoolNodes)
        })
        return allPoolNodes.flat()
    }

    private getPoolNodesChildren(poolNode: GraphPoolNode) {
        const children = poolNode.outgoingEdges.map(edge => edge.target)
        return children as GraphPoolNode[]
    }

    private getPoolNodesChildrenRecursive(poolNode: GraphPoolNode, children: GraphPoolNode[]) {
        const childrenOfPoolNode = this.getPoolNodesChildren(poolNode)
        childrenOfPoolNode.forEach(child => {
            if (!children.includes(child)) {
                children.unshift(child)
            }
        })
        childrenOfPoolNode.forEach(child => {
            if (child instanceof GraphPoolNode) {
                this.getPoolNodesChildrenRecursive(child, children)
            }
        })
        return children
    }
}
