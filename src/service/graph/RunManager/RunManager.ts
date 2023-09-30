import {Graph} from "../Graph";
import {
    EConnectionMode,
    isIIsEventTriggered,
    isIIsExecuteOutgoingNodes, isIResetBeforeStep,
    isITriggeredEvent,
    isIUpdateGraphNodeStatePerStep,
    isIUpdateStatePerNodeUpdate,
    isUpdateGraphNodeState
} from "../../../interface";
import {
    GraphDataNode,
    GraphEventListenerNode,
    GraphFormulaNode,
    GraphInvokableNode,
    GraphLoopNode,
    GraphStartNode
} from "../GraphNodes";
import {GraphHelper} from "../GraphHelper";
import {GraphMicroLoopNode} from "../GraphNodes/GraphMicroLoopNode";
import {GraphChainEdge} from "../GraphEdge";
import {GenericGraphNode} from "../GenericGraphNode";
import {findChainItemByTarget} from "../helper";
import {IChainItem} from "./ChainItem";
import {NodeExecutionManager} from "./NodeExecutionManager";

export class RunManager {
    private graph: Graph
    private _countOfExecuted = 0
    private _diameter?: number
    private _diagramRunCount = 0
    private _currentStep = 0
    // private invokedNodes: GraphNodeManager = new GraphNodeManager()
    private executionOrder: IChainItem[] = []

    constructor(graph: Graph) {
        this.graph = graph
    }

    get diagramRunCount() {
        return this._diagramRunCount
    }

    get currentStep() {
        return this._currentStep
    }

    get diameter() {
        return this._diameter || 0
    }

    get countOfExecuted() {
        return this._countOfExecuted
    }

    private resetCountOfExecuted() {
        this._countOfExecuted = 0
    }

    addCountOfExecuted() {
        this._countOfExecuted++
    }

    resetCurrentStep() {
        this._diagramRunCount = 0
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

        this.resetCountOfExecuted()
        this.resetBeforeStep()
        const chain = this.getExecutionOrder()
        this.setExecutionOrder(chain)
        this._diameter = this.getDiameter()

        this.executeChainOrder(chain)
        this.updateNodePerStep()
        this.incrementStep()
        const updatedDiameter = this.getDiameter()
        if (updatedDiameter === this._diameter) {
            this.resetAfterDiagramRun()

        }
    }


    private getDiameter() {
        const chain = this.getExecutionOrder()
        const startChains = chain.filter(chainItem => {
            if (chainItem.target instanceof GraphEventListenerNode) {
                return chainItem.target.checkIsEventTriggered()
            }
            return true
        })
        const startNodesFromStart = startChains
            .find(chainItem => chainItem.target instanceof GraphStartNode)
            ?.outgoingConnected?.map(chainItem => chainItem.target) || []
        const eventListenerNodes = startChains
            .filter(chainItem => !(chainItem.target instanceof GraphStartNode))
            .map(chainItem => chainItem.target)

        const startNodes = [...startNodesFromStart, ...eventListenerNodes]
        return GraphHelper.findLongestBranch(startNodes)
    }


    executeNode(chainItem: IChainItem, nodeToExecute: NodeExecutionManager, options: { invoke: boolean }) {
        const target = chainItem.target
        const edge = chainItem.edge
        const isEdgeMeetCondition = edge === undefined
            ? true
            : edge.isMeetCondition
        if (!isEdgeMeetCondition && !(target instanceof GraphDataNode)) {
            return
        }
        if (target instanceof GraphInvokableNode) {
            if (target instanceof GraphLoopNode && !target.isLoopActive) {
                return
            }
            if (options?.invoke) {

                target.invokeStep()
                if (target instanceof GraphLoopNode && chainItem.inner) {
                    // check if loop is has a parent loop
                    const hasParentLoop = target.data.parentId !== undefined


                    if (hasParentLoop && target instanceof GraphMicroLoopNode) {
                        target.resetLoopStep()
                        for (let i = 0; i < target.loopCount; i++) {
                            const loopNodeExecutionManager = new NodeExecutionManager(this, chainItem.inner)
                            loopNodeExecutionManager.invokeAll()
                        }
                    } else {
                        const loopNodeExecutionManager = new NodeExecutionManager(this, chainItem.inner)
                        loopNodeExecutionManager.invokeAll()

                    }
                }

                if (isITriggeredEvent(target)) {
                    const triggeredEventName = target.getTriggeredEvent()
                    const listenerNodes = this.executionOrder
                        .filter(node => node.target instanceof GraphEventListenerNode
                            && node.target.eventName === triggeredEventName)
                    const roots = Array.from(GraphHelper.findAllRootsOfBranch(target))
                    const distanceFromTargetToRoot = GraphHelper.shortestDistance(roots[0], target)
                    if (distanceFromTargetToRoot) {
                        const compensation = chainItem.stepExecutionCompensation > 0
                            ? distanceFromTargetToRoot + chainItem.stepExecutionCompensation + 1
                            : distanceFromTargetToRoot
                        listenerNodes.map(listenerChainItem => {
                            listenerChainItem.target.setStepExecutionCompensation(compensation)

                        })
                    }
                }

                if (edge instanceof GraphChainEdge) {
                    chainItem.edge?.onExecute()
                }

            }


            if (target instanceof GraphDataNode && target.isExecutedChangesPerStep) {
                this.graph.nodes.forEach(node => {
                    if (isIUpdateStatePerNodeUpdate(node)) {
                        node.updateStatePerNodeUpdate()
                    }
                })
            }
            if (chainItem.end && chainItem.end.edge && !chainItem.end.edge.isMeetCondition) {
                const chainItemToExecute = this.findDeepChainItemByNode(chainItem.end.target)
                if (chainItemToExecute && chainItemToExecute.inner) {

                    chainItemToExecute.inner.forEach(item => {
                        if (item.target instanceof GraphMicroLoopNode) {
                            item.target.resetLoopStep()
                        }
                    })
                }
            }


            const isExecuteOutgoingNodes = (isIIsExecuteOutgoingNodes(target) ? target.isExecuteOutgoingNodes : true)

            if (chainItem.outgoingConnected && isExecuteOutgoingNodes) {
                chainItem.outgoingConnected.forEach(nextChainItem => {
                    nextChainItem.target.setStepExecutionCompensation(chainItem.stepExecutionCompensation)
                })
                nodeToExecute.addNodesToExecute(chainItem.outgoingConnected)
            }

        }
    }


    private findDeepChainItemByNode(node: GenericGraphNode): IChainItem | undefined {
        return findChainItemByTarget(this.executionOrder, node);
    }


    private executeChainOrder(chainItems: IChainItem[]) {
        const nodeToExecute = new NodeExecutionManager(this, [])
        chainItems.forEach(chainItem => {
            const target = chainItem.target
            const chainConnection = chainItem.edge
            const isChainMeetCondition = chainConnection?.isMeetCondition === undefined || chainConnection?.isMeetCondition

            let isCanAdd = false
            if (target instanceof GraphInvokableNode && isChainMeetCondition) {
                if (isIIsEventTriggered(target)) {
                    if (target.isEventTriggered(chainConnection?.sourceMode)) {
                        isCanAdd = true
                    }
                } else {
                    isCanAdd = true
                }
                if (isCanAdd) {
                    if (chainItem.target instanceof GraphStartNode && chainItem.outgoingConnected) {
                        // nodeToExecute = new NodeExecutionManager(this, chainItem.outgoingConnected)
                        nodeToExecute.addNodesToExecute(chainItem.outgoingConnected)
                    } else if (chainItem.target instanceof GraphLoopNode && chainItem.inner) {
                        // nodeToExecute = new NodeExecutionManager(this, chainItem.inner)
                        nodeToExecute.addNodesToExecute(chainItem.inner)
                    } else {
                        // nodeToExecute = new NodeExecutionManager(this, [chainItem])
                        nodeToExecute.addNodesToExecute([chainItem])
                    }
                }

            }

        })
        nodeToExecute.invokeNodesToExecute()


    }


    private incrementStep() {
        this._diagramRunCount++
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
            if (source instanceof GraphInvokableNode) {
                return this.getChainChildrenRecursive(new IChainItem(source))
            }
        }).filter(Boolean) as IChainItem[][]

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

    private getChainChildrenRecursive(startedChainItem: IChainItem, children: IChainItem[] = [startedChainItem], visited = new Set<string>()) {
        if (!visited.has(startedChainItem.target.data.id)) {
            visited.add(startedChainItem.target.data.id)
            const childChainItem = this.getChainChildren(startedChainItem)

            startedChainItem.outgoingConnected = childChainItem.outgoingConnected
            startedChainItem.inner = childChainItem.inner
            startedChainItem.end = childChainItem.endChainItem
            const nextChildren = [...childChainItem.outgoingConnected, ...childChainItem.inner]

            nextChildren.forEach(child => {
                if (!(child.edge?.targetMode === EConnectionMode.LoopChildrenToExternal)) {

                    const outgoingEdges = child.target.outgoingEdges
                    if (outgoingEdges.length > 0 && !visited.has(child.target.data.id)) {
                        this.getChainChildrenRecursive(child, children, visited)
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
        return []
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
            if ((edge instanceof GraphChainEdge || target instanceof GraphDataNode) && target instanceof GraphInvokableNode) {
                const newChainItem = new IChainItem(target, edge as GraphChainEdge)
                if (edge.sourceMode === EConnectionMode.LoopInnerToChildren) {
                    inner.push(newChainItem)
                } else if (edge.targetMode === EConnectionMode.LoopChildrenToExternal) {
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


    get isDiagramFinished() {
        return this._diagramRunCount === this._diameter
    }

    resetAfterDiagramRun() {
        if (this.isDiagramFinished) {
            this._diagramRunCount = 0
            this.graph.nodesManager.resetAfterDiagramRun();
        }
    }

}
