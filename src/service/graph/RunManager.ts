import {Graph} from "./Graph";
import {
    GraphBaseNode,
    GraphDataNode,
    GraphEventListenerNode,
    GraphFormulaNode,
    GraphInvokableNode,
    GraphLoopNode,
    GraphStartNode
} from "./GraphNodes";
import {
    EConnectionMode,
    isIIsEventTriggered,
    isIIsExecuteOutgoingNodes,
    isIResetBeforeStep,
    isITriggeredEvent,
    isIUpdateGraphNodeStatePerStep,
    isIUpdateStatePerNodeUpdate,
    isUpdateGraphNodeState
} from "../../interface";
import {GraphChainEdge} from "./GraphEdge";
import {GraphMicroLoopNode} from "./GraphNodes/GraphMicroLoopNode";

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
        this.resetBeforeStep()
        const chain = this.getExecutionOrder()
        this.setExecutionOrder(chain)
        // remove listener nodes from execution order
        const startChains = chain.filter(chainItem => !(chainItem.target instanceof GraphEventListenerNode))
        this.executeChainOrder(startChains)
        this.updateNodePerStep()
    }

    private nodesToExecute: IChainItem[] = []

    private executeNode(chainItem: IChainItem, params?: {
        notExecuteOutgoingConnected?: boolean
    }) {
        const target = chainItem.target

        const edge = chainItem.edge
        if (target instanceof GraphInvokableNode) {
            console.log('node: ', target.data.name)
            if (target instanceof GraphLoopNode && !target.isLoopActive) {
                return
            }

            target.invokeStep()
            if (edge instanceof GraphChainEdge) {
                chainItem.edge?.onExecute()

            }

            if (isITriggeredEvent(target)) {
                const triggeredEventName = target.getTriggeredEvent()
                const listenerNodes = this.executionOrder
                    .filter(node => node.target instanceof GraphEventListenerNode
                        && node.target.eventName === triggeredEventName)
                this.executeChainOrder(listenerNodes)
            }
            if (target instanceof GraphDataNode && target.isExecutedChangesPerStep) {
                this.graph.nodes.forEach(node => {
                    if (isIUpdateStatePerNodeUpdate(node)) {
                        node.updateStatePerNodeUpdate()
                    }
                })
            }
            if (target instanceof GraphMicroLoopNode) {
                console.log('target.loopCount: ', target.data.name)
                // check if loop is has a parent loop
                const hasParentLoop = target.data.parentId !== undefined
                target.resetLoopStep()
                if (hasParentLoop && chainItem.inner) {
                    // if(target.loopCount > 1) {
                        for (let i = 0; i < target.loopCount - 1; i++) {
                            console.log('chainItem.inner: ', chainItem.inner)
                            this.executeChainOrder(chainItem.inner)
                        }
                    // } else {
                    //     this.executeChainOrder(chainItem.inner)
                    // }
                }
            }
            if (chainItem.end && chainItem.end.edge && !chainItem.end.edge.isMeetCondition) {
                const chainItemToExecute = this.findDeepChainItemByNode(chainItem.end.target)
                if (chainItemToExecute && chainItemToExecute.inner) {

                    chainItemToExecute.inner.forEach(item => {
                        if (item.target instanceof GraphMicroLoopNode) {
                            item.target.resetLoopStep()
                        }
                    })
                    this.executeChainOrder(chainItemToExecute.inner)
                }
            }
            if (chainItem.inner) {
                this.executeChainOrder(chainItem.inner)
            }
            const notExecuteOutgoingConnected = params?.notExecuteOutgoingConnected !== undefined
                ? params?.notExecuteOutgoingConnected
                : false
            if (chainItem.outgoingConnected && (isIIsExecuteOutgoingNodes(target) ? target.isExecuteOutgoingNodes : true) && !notExecuteOutgoingConnected) {
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
            if (node instanceof GraphStartNode || node instanceof GraphEventListenerNode || node instanceof GraphFormulaNode && node.data.isAutomatic) {
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
        startedChainItem.end = childChainItem.endChainItem
        const nextChildren = [...childChainItem.outgoingConnected, ...childChainItem.inner]

        nextChildren.forEach(child => {
            if (!(child.edge?.targetMode === EConnectionMode.LoopChildrenToExternal)) {

                const outgoingEdges = child.target.outgoingEdges
                if (outgoingEdges.length > 0) {
                    this.getChainChildrenRecursive(child, children)
                }

            }
        })
        startedChainItem.inner.sort((a, b) => {
            if (!a.end && b.end) {
                return -1;
            } else if (a.end && !b.end) {
                return 1;
            }
            return 0;
        });
        return children
    }

    private getChainChildren(chainItem: IChainItem): {
        outgoingConnected: IChainItem[]
        inner: IChainItem[]
        endChainItem: IChainItem | undefined
    } {
        const outgoingConnected: IChainItem[] = []
        const inner: IChainItem[] = []
        let endChainItem: IChainItem | undefined

        chainItem.target.outgoingEdges.forEach(edge => {
            const target = edge.target
            if (edge instanceof GraphChainEdge || target instanceof GraphDataNode) {
                const newChainItem: IChainItem = {
                    target: target,
                    edge: edge as GraphChainEdge,
                }
                if (edge.sourceMode === EConnectionMode.LoopInnerToChildren) {
                    inner.push(newChainItem)
                } else if (edge.targetMode === EConnectionMode.LoopChildrenToExternal) {
                    // chainItem.end = newChainItem
                    endChainItem = newChainItem
                } else {
                    outgoingConnected.push(newChainItem)
                }
            }
        })

        return {
            outgoingConnected,
            inner,
            endChainItem,
        }
    }

    private resetBeforeStep() {
        this.resetIsTransferredResources()
    }

    private resetIsTransferredResources() {
        this.graph.edges.forEach(edge => {
            if (isIResetBeforeStep(edge)) {
                edge.resetBeforeStep()
            }
        })
        this.graph.nodes.forEach(node => {
            if (isIResetBeforeStep(node)) {
                node.resetBeforeStep()
            }
        })
    }

    // private findParentLoop(chainItem: IChainItem): IChainItem | undefined {
    //     const parentChainItem = this.findParentChainItem(chainItem)
    //     if (parentChainItem && parentChainItem.target instanceof GraphLoopNode) {
    //         return parentChainItem
    //     }
    //     return undefined
    // }

    // private hasParentLoop(chainItem: IChainItem): boolean {
    //     return Boolean(this.findParentChainItem(chainItem))
    // }
    //
    // private findParentChainItemRecursive(chainItem: IChainItem): IChainItem | undefined {
    //     const parentChainItem = this.findParentChainItem(chainItem)
    //     if (parentChainItem) {
    //         return parentChainItem
    //     }
    //     if (chainItem.inner) {
    //         for (const innerChainItem of chainItem.inner) {
    //             const parentChainItem = this.findParentChainItemRecursive(innerChainItem)
    //             if (parentChainItem) {
    //                 return parentChainItem
    //             }
    //         }
    //     }
    //     return undefined
    // }
    //
    // findParentChainItem(chainItem: IChainItem): IChainItem | undefined {
    //     const parentChainItem = this.executionOrder.find(item => {
    //         if (item.outgoingConnected) {
    //             return item.outgoingConnected.find(outgoingChainItem => {
    //                 return outgoingChainItem.target === chainItem.target
    //             })
    //         }
    //     })
    //     return parentChainItem
    // }
}
