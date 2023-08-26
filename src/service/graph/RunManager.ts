import {Graph} from "./Graph";
import {GraphBaseNode, GraphDataNode, GraphEventListenerNode, GraphInvokableNode, GraphStartNode} from "./GraphNodes";
import {
    EConnectionMode,
    isIIsEventTriggered,
    isITriggeredEvent,
    isIUpdateGraphNodeStatePerStep,
    isUpdateGraphNodeState
} from "../../interface";
import {GraphChainEdge, GraphDataEdge} from "./GraphEdge";

export interface IChainItem {
    target: GraphBaseNode
    edge?: GraphChainEdge
    outgoingConnected?: IChainItem[]
    inner?: IChainItem[]
    end?: IChainItem
}

function findChainItemByTarget(chain: IChainItem[], target: GraphBaseNode): IChainItem | undefined {
    for (const chainItem of chain) {
        if (chainItem.target === target) {
            return chainItem;
        }

        // Check outgoingConnected chain items recursively
        if (chainItem.outgoingConnected) {
            const outgoingResult = findChainItemByTarget(chainItem.outgoingConnected, target);
            if (outgoingResult) {
                return outgoingResult;
            }
        }

        // Check inner connected chain items recursively
        if (chainItem.inner) {
            const innerResult = findChainItemByTarget(chainItem.inner, target);
            if (innerResult) {
                return innerResult;
            }
        }
    }

    return undefined; // Item not found
}

export class RunManager {
    private graph: Graph
    private _currentStep = 0
    // private invokedNodes: GraphNodeManager = new GraphNodeManager()
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
    }

    private executeNode(chainItem: IChainItem) {
        const target = chainItem.target
        if (target instanceof GraphInvokableNode) {
            target.invokeStep()
            if (isITriggeredEvent(target)) {
                const triggeredEventName = target.getTriggeredEvent()
                const listenerNodes = this.executionOrder
                    .filter(node => node.target instanceof GraphEventListenerNode
                        && node.target.eventName === triggeredEventName)
                this.executeChainOrder(listenerNodes)
            }
            if (chainItem.end && chainItem.end.edge && !chainItem.end.edge.isMeetCondition) {
                const chainItemToExecute = this.findDeepChainItemByNode(chainItem.end.target)
                if (chainItemToExecute && chainItemToExecute.inner) {
                    this.executeChainOrder(chainItemToExecute.inner)
                }
            }
            if (chainItem.inner) {
                this.executeChainOrder(chainItem.inner)
            }
            if (chainItem.outgoingConnected) {
                this.executeChainOrder(chainItem.outgoingConnected)
            }
        }
    }

    private findDeepChainItemByNode(node: GraphBaseNode): IChainItem | undefined {
        return findChainItemByTarget(this.executionOrder, node);
    }

    private executeChainOrder(chainItems: IChainItem[]) {
        chainItems.forEach(chainItem => {
            const target = chainItem.target
            const chainConnection = chainItem.edge
            const isChainMeetCondition = chainConnection?.isMeetCondition === undefined || chainConnection?.isMeetCondition
            if (target instanceof GraphInvokableNode && isChainMeetCondition) {
                if (isIIsEventTriggered(target)) {
                    if (target.isEventTriggered(chainConnection?.sourceMode)) {
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
        return this.graph.nodes.filter(node => {
            if (node instanceof GraphStartNode || node instanceof GraphEventListenerNode) {
                return node
            }
        })
    }

    private getExecutionOrder(): IChainItem[] {
        const startedNodes = this.getStartedNodes()
        const childrenNodes = startedNodes.map(source => {
            return this.getChainChildrenRecursive({
                target: source,
            })
        })

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

        startedChainItem.outgoingConnected = childChainItem.outgoingConnected
        startedChainItem.inner = childChainItem.inner

        const nextChildren = [...childChainItem.outgoingConnected, ...childChainItem.inner]

        nextChildren.forEach(child => {
            if (!(child.edge?.targetMode === EConnectionMode.LoopChildrenToExternal)) {

                const outgoingEdges = child.target.outgoingEdges
                if (outgoingEdges.length > 0) {
                    this.getChainChildrenRecursive(child, children)
                }

            }
        })
        return children
    }

    private getChainChildren(chainItem: IChainItem): {
        outgoingConnected: IChainItem[]
        inner: IChainItem[]
    } {
        const outgoingConnected: IChainItem[] = []
        const inner: IChainItem[] = []
        chainItem.target.outgoingEdges.forEach(edge => {
            const target = edge.target
            console.log(`edge: ${edge.target.data.name}`, edge)
            if (edge instanceof GraphChainEdge || target instanceof GraphDataNode) {
                const newChainItem: IChainItem = {
                    target: target,
                    edge: edge as GraphChainEdge,
                }
                if (edge.sourceMode === EConnectionMode.LoopInnerToChildren) {
                    inner.push(newChainItem)
                } else if (edge.targetMode === EConnectionMode.LoopChildrenToExternal) {
                    chainItem.end = newChainItem
                } else {
                    outgoingConnected.push(newChainItem)
                }
            }
        })
        console.log(`outgoingConnected: ${chainItem.target.data.name} `, outgoingConnected, 'inner: ', inner, chainItem)
        return {
            outgoingConnected,
            inner,
        }
    }

    private resetIsTransferredResources() {
        this.graph.edges.forEach(edge => {
            if (edge instanceof GraphDataEdge) {
                edge.changeIsTransferredResources(false)
            }
        })
    }
}
