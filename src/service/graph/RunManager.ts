import {Graph} from "./Graph";
import {GraphBaseNode, GraphDataNode, GraphEventListenerNode, GraphInvokableNode, GraphStartNode} from "./GraphNodes";
import {
    EConnectionMode,
    isIIsEventTriggered,
    isITriggeredEvent,
    isIUpdateGraphNodeStatePerStep,
    isUpdateGraphNodeState
} from "../../interface";
import {GraphNodeManager} from "./NodeManager";
import {GraphChainEdge, GraphDataEdge} from "./GraphEdge";

export interface IChainItem {
    target: GraphBaseNode
    edge?: GraphChainEdge
    children?: IChainItem[]
}

export class RunManager {
    private graph: Graph
    private _currentStep = 0
    private invokedNodes: GraphNodeManager = new GraphNodeManager()
    private executionOrder: IChainItem[] = []

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

    updateNodePerStep() {
        const nodes = this.graph.nodes
        nodes.forEach(node => {
            if (isIUpdateGraphNodeStatePerStep(node)) {
                node.updateStatePerStep()
            }
        })
    }

    private setExecutionOrder(nodes: IChainItem[]) {
        this.executionOrder = nodes
    }

    invokeStep() {
        this.incrementStep()
        this.resetIsTransferredResources()
        const nodes = this.getExecutionOrder()
        console.log('executeChainOrder: ', nodes)
        this.setExecutionOrder(nodes)
        this.executeChainOrder(nodes)

        this.updateNodePerStep()
        this.invokedNodes.clear()
    }

    private executeNode(node: IChainItem) {
        console.log('executeNode: ', node.target.data.name)
        const target = node.target

        if (target instanceof GraphInvokableNode) {
            target.invokeStep()
            if (isITriggeredEvent(target)) {
                const triggeredEventName = target.getTriggeredEvent()
                const listenerNodes = this.executionOrder
                    .filter(node => node.target instanceof GraphEventListenerNode
                        && node.target.eventName === triggeredEventName)
                this.executeChainOrder(listenerNodes)
            }
            this.invokedNodes.add(node.target)
            if (node.children) {
                this.executeChainOrder(node.children)
            }
        }
    }

    private executeChainOrder(chainItems: IChainItem[]) {
        chainItems.forEach(chainItem => {
            const target = chainItem.target
            const chainConnection = chainItem.edge
            const isChainMeetCondition = chainConnection?.isMeetCondition === undefined || chainConnection?.isMeetCondition
            if (target instanceof GraphInvokableNode && isChainMeetCondition && !this.invokedNodes.has(target)) {
                if (isIIsEventTriggered(target)) {
                    console.log('mode: ', chainConnection?.sourceMode, chainConnection?.targetMode)
                    if (target.isEventTriggered(chainConnection?.targetMode)) {
                        this.executeNode(chainItem)
                    }
                } else {
                    this.executeNode(chainItem)
                }

            }
        })
    }


    private incrementStep() {
        this._currentStep++
    }

    private getStartedNodes() {
        const startNodes = this.graph.nodes.filter(node => {
            if (node instanceof GraphStartNode || node instanceof GraphEventListenerNode) {
                return node
            }
        })
        return startNodes
    }

    private getExecutionOrder(): IChainItem[] {
        const startedNodes = this.getStartedNodes()
        const childrenNodes = startedNodes.map(source => {
            return this.getChainChildrenRecursive({
                target: source,
            })
        })
        // nodes queue that start from trigger listener invoke in last step
        return childrenNodes.sort((a, b) => {
            const aFirstNode = a[0].target
            const bFirstNode = b[0].target
            if (aFirstNode instanceof GraphStartNode && !(bFirstNode instanceof GraphEventListenerNode)) {
                return -1
            } else if (!(aFirstNode instanceof GraphStartNode) && bFirstNode instanceof GraphEventListenerNode) {
                return 1
            }
            return 0
        }).flat()
    }

    private getChainChildrenRecursive(startedChainItem: IChainItem, children: IChainItem[] = [startedChainItem]) {
        const childChainItem = this.getChainChildren(startedChainItem)

        startedChainItem.children = childChainItem

        childChainItem.forEach(child => {

            const outgoingEdges = child.target.outgoingEdges
            if (outgoingEdges.length > 0) {
                this.getChainChildrenRecursive(child, children)
            }
        })
        return children
    }

    private getChainChildren(chainItem: IChainItem): IChainItem[] {
        const children = chainItem.target.outgoingEdges.map(edge => {
            const target = edge.target
            if (edge instanceof GraphChainEdge || target instanceof GraphDataNode) {
                return {target, edge}
            }
        }).filter(item => item !== undefined) as IChainItem[]

      return  children.sort(chainItem => {
            const edge = chainItem.edge
            if (edge?.sourceMode === EConnectionMode.NodeOutgoing) {
                return 1
            }
            return -1
        })
    }

    private resetIsTransferredResources() {
        this.graph.edges.forEach(edge => {
            if (edge instanceof GraphDataEdge) {
                edge.changeIsTransferredResources(false)
            }
        })
    }
}
