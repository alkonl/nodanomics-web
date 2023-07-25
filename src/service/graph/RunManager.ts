import {Graph} from "./Graph";
import {GraphInteractiveNode, GraphInvokableNode, GraphPoolNode} from "./GraphNodes";
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
        this.updateState()
        const listener: GraphEventListenerNode | undefined = this.graph.nodesManager.nodes.find(node => node instanceof GraphEventListenerNode)
        const nodes = this.sortedNodes()
        console.log('RunManager.graph:', listener?.isEventTriggered)
        console.log('RunManager.graph.nodes.order:', nodes.map(node => node.data.type))
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
                console.log('RunManager.updateState:', node)
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
        [EDiagramNode.Source]: 0,
        [EDiagramNode.EventTrigger]: 1,
        [EDiagramNode.EventListener]: 2,

    }

    private sortedNodes() {
        // sort by executedOrder
        const nodes = this.graph.nodes
        const sortedNodes = nodes.filter(node => {
            return !(node instanceof GraphPoolNode)
        }).sort((a, b) => {
            const aOrder = this.executedOrder[a.data.type] || 10
            const bOrder = this.executedOrder[b.data.type] || 10
            return aOrder - bOrder
        }).filter(node => {
            if(node instanceof GraphInteractiveNode) {
                return node.triggerMode !== ENodeTrigger.enabling
            }
        })
        const poolNodes = nodes.filter(node => node instanceof GraphPoolNode)
        const triggeredNodes = nodes.filter(node => {
            if (node instanceof GraphInteractiveNode) {
                console.log(`triggered ${node.data.type}: ${node.isTriggeredIncomingNodes} `, node)
                return node.isTriggeredIncomingNodes
            } else {
                return true
            }
        })
        return [...poolNodes, ...sortedNodes, ...triggeredNodes]
    }

}
