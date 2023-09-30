import {IChainItem} from "./ChainItem";
import {RunManager} from "./RunManager";
import {GraphDataNode, GraphEventListenerNode, GraphInvokableNode, GraphLoopNode} from "../GraphNodes";
import {GraphMicroLoopNode} from "../GraphNodes/GraphMicroLoopNode";
import {isIIsExecuteOutgoingNodes, isITriggeredEvent, isIUpdateStatePerNodeUpdate} from "../../../interface";
import {GraphHelper} from "../GraphHelper";
import {GraphChainEdge} from "../GraphEdge";

export class NodeExecutionManager {
    executionCount = 0
    current: IChainItem[]
    next: IChainItem[]
    runManager: RunManager
    reason?: string
    private executePerOneStep = false

    constructor(runManager: RunManager, starters: IChainItem[]) {
        this.runManager = runManager
        this.current = []
        this.next = [...starters]
        const nodes = starters.map(({target}) => target)
    }

    invokeNodesToExecute() {
        if (this.executionCount === 0) {
            this.current = [...this.next]
            this.executionCount = this.next.length
            this.next = []
            if (this.current.length !== 0) {
                // const isStart = this.current[0]?.target instanceof GraphStartNode





                for (const argument of this.current) {
                    const compensation = argument.stepExecutionCompensation
                        ? argument.stepExecutionCompensation
                        : 0
                    const currentLayerTick = this.runManager.diagramRunCount
                    const invoke = this.runManager.countOfExecuted === currentLayerTick - compensation

                    this.executionCount--
                    this.executeNode(argument, this, {invoke})

                }
                this.runManager.addCountOfExecuted()
                this.invokeNodesToExecute()
            }
        }

    }



    invokeAll() {
        if (this.executionCount === 0) {

            this.current = [...this.next]
            this.executionCount = this.next.length
            this.next = []
            if (this.current.length !== 0) {
                for (const argument of this.current) {
                    this.executionCount--
                    this.executeNode(argument, this, {invoke: true})
                    this.invokeAll()
                }
            }
        }
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
                            const loopNodeExecutionManager = new NodeExecutionManager(this.runManager, chainItem.inner)
                            loopNodeExecutionManager.invokeAll()
                        }
                    } else {
                        const loopNodeExecutionManager = new NodeExecutionManager(this.runManager, chainItem.inner)
                        loopNodeExecutionManager.invokeAll()

                    }
                }

                if (isITriggeredEvent(target)) {
                    const triggeredEventName = target.getTriggeredEvent()
                    const listenerNodes = this.runManager.executionOrder
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
                this.runManager.graph.nodes.forEach(node => {
                    if (isIUpdateStatePerNodeUpdate(node)) {
                        node.updateStatePerNodeUpdate()
                    }
                })
            }
            // if (chainItem.end && chainItem.end.edge && !chainItem.end.edge.isMeetCondition) {
            //     const chainItemToExecute = this.runManager.findDeepChainItemByNode(chainItem.end.target)
            //     if (chainItemToExecute && chainItemToExecute.inner) {
            //
            //         chainItemToExecute.inner.forEach(item => {
            //             if (item.target instanceof GraphMicroLoopNode) {
            //                 item.target.resetLoopStep()
            //             }
            //         })
            //     }
            // }


            const isExecuteOutgoingNodes = (isIIsExecuteOutgoingNodes(target) ? target.isExecuteOutgoingNodes : true)

            if (chainItem.outgoingConnected && isExecuteOutgoingNodes) {
                chainItem.outgoingConnected.forEach(nextChainItem => {
                    nextChainItem.target.setStepExecutionCompensation(chainItem.stepExecutionCompensation)
                })
                nodeToExecute.addNodesToExecute(chainItem.outgoingConnected)
            }

        }
    }



    setExecutePerOneStep(value: boolean) {
        this.executePerOneStep = value
    }

    getOtherNodesToExecute() {
        return this.next
    }

    addNodesToExecute(chainItem: IChainItem[]) {
        this.next.push(...chainItem)
    }
}
