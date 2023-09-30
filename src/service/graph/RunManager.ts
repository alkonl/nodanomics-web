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
import {NodeExecutionManager} from "./NodeExecutionManager";

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
    private _countOfExecuted = 0
    private _diameter?: number


    private _currentStep = 0
    // private invokedNodes: GraphNodeManager = new GraphNodeManager()
    private executionOrder: IChainItem[] = []

    constructor(graph: Graph) {
        this.graph = graph
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
        console.log('chain: ', chain)
        this.setExecutionOrder(chain)
        console.log('chain: ', chain)
        // remove listener nodes from execution order
        const startChains = chain.filter(chainItem => {
            if (chainItem.target instanceof GraphEventListenerNode) {
                console.log('chainItem.target: ', chainItem.target.data)
                return chainItem.target.checkIsEventTriggered()
            }
            return true
        })
        const startNodes = startChains
            .find(chainItem => chainItem.target instanceof GraphStartNode)
            ?.outgoingConnected?.map(chainItem => chainItem.target) || []
        this._diameter = this.findLongestBranch(startNodes)
        this.executeChainOrder(chain)
        this.updateNodePerStep()
        this.incrementStep()
        this.resetAfterDiagramRun()

    }


    executeNode(chainItem: IChainItem, nodeToExecute: NodeExecutionManager, options?: { notInvoke?: boolean }) {
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
            if (!options?.notInvoke) {
                console.log('target: ', target.data.name)

                target.invokeStep()
                if (target instanceof GraphLoopNode && chainItem.inner) {
                    // check if loop is has a parent loop
                    const hasParentLoop = target.data.parentId !== undefined


                    if (hasParentLoop && target instanceof GraphMicroLoopNode) {
                        target.resetLoopStep()
                        // if(target.loopCount > 1) {
                        for (let i = 0; i < target.loopCount; i++) {
                            const loopNodeExecutionManager = new NodeExecutionManager(this, chainItem.inner)
                            loopNodeExecutionManager.invokeAll()
                        }
                    } else {
                        const loopNodeExecutionManager = new NodeExecutionManager(this, chainItem.inner)
                        loopNodeExecutionManager.invokeAll()
                        // nodeToExecute.addNodesToExecute(chainItem.inner)
                        // this.executeChainOrder([chainItem])
                    }
                }

                if (isITriggeredEvent(target)) {
                    // const triggeredEventName = target.getTriggeredEvent()
                    // const listenerNodes = this.executionOrder
                    //     .filter(node => node.target instanceof GraphEventListenerNode
                    //         && node.target.eventName === triggeredEventName)
                    // const longestListenerDiameter = this.findLongestBranch(listenerNodes.map(node => node.target))
                    // const roots = Array.from(this.findAllRootsOfBranch(target))
                    // const distanceFromTargetToRoot = this.shortestDistance(roots[0], target)
                    // if (distanceFromTargetToRoot) {
                    //     const possibleNewDiameter = longestListenerDiameter + distanceFromTargetToRoot
                    //     this._diameter = possibleNewDiameter > this.diameter ? possibleNewDiameter : this.diameter
                    //     this._wasDiameterUpdated = true
                    // }
                    // listenerNodes.forEach(node => {
                    //     node.stepExecutionCompensation = distanceFromTargetToRoot || 0
                    // })
                    // console.log('roots and diameter: ', roots, this.diameter)
                    //
                    // nodeToExecute.addNodesToExecute(listenerNodes)
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
            // if (target instanceof GraphMicroLoopNode && chainItem.inner) {
            //     // check if loop is has a parent loop
            //     const hasParentLoop = target.data.parentId !== undefined
            //
            //     if (hasParentLoop && chainItem.inner) {
            //         target.resetLoopStep()
            //         // if(target.loopCount > 1) {
            //         for (let i = 0; i < target.loopCount; i++) {
            //             this.executeChainOrder(chainItem.inner)
            //         }
            //     } else {
            //         this.executeChainOrder(chainItem.inner)
            //     }
            // }

            if (chainItem.end && chainItem.end.edge && !chainItem.end.edge.isMeetCondition) {
                const chainItemToExecute = this.findDeepChainItemByNode(chainItem.end.target)
                if (chainItemToExecute && chainItemToExecute.inner) {

                    chainItemToExecute.inner.forEach(item => {
                        if (item.target instanceof GraphMicroLoopNode) {
                            item.target.resetLoopStep()
                        }
                    })
                    // this.executeChainOrder(chainItemToExecute.inner)
                }
            }


            const isExecuteOutgoingNodes = (isIIsExecuteOutgoingNodes(target) ? target.isExecuteOutgoingNodes : true)

            if (chainItem.outgoingConnected && isExecuteOutgoingNodes) {
                nodeToExecute.addNodesToExecute(chainItem.outgoingConnected)
                // chainItem.outgoingConnected.forEach(chainItem => {
                //     const isEdgeMeetCondition = chainItem.edge === undefined
                //         ? true
                //         : chainItem.edge.isMeetCondition
                //     if (isEdgeMeetCondition || target instanceof GraphDataNode) {
                //
                //     }
                //
                // })
            }

        }
    }


    private findDeepChainItemByNode(node: GraphBaseNode): IChainItem | undefined {
        return findChainItemByTarget(this.executionOrder, node);
    }


    private executeChainOrder(chainItems: IChainItem[]) {
        console.log('chainItems: ', chainItems)
        const nodeToExecute = new NodeExecutionManager(this, [])
        // nodeToExecute.reason = chainItems[0]?.target.data.name
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


    findAllRootsOfBranch(node: GraphBaseNode, visited: Set<GraphBaseNode> = new Set()): Set<GraphBaseNode> {
        // If the node has been visited before, return an empty set to prevent infinite loops.
        if (visited.has(node)) return new Set();

        visited.add(node);

        // If the node has no incoming edges, it's a root.
        if (node.incomingEdges.length === 0) {
            return new Set([node]);
        }

        const roots = new Set<GraphBaseNode>();
        for (const edge of node.incomingEdges) {
            const sourceRoots = this.findAllRootsOfBranch(edge.source, visited);
            for (const root of sourceRoots) {
                roots.add(root);
            }
        }

        return roots;
    }

    shortestDistance(start: GraphBaseNode, end: GraphBaseNode): number | undefined {
        const visited = new Set<GraphBaseNode>();
        const queue: { node: GraphBaseNode, distance: number }[] = [{node: start, distance: 0}];

        while (queue.length > 0) {
            const current = queue.shift();

            if (current) {
                if (current.node === end) {
                    return current.distance;
                }


                visited.add(current.node);

                for (const edge of current.node.outgoingEdges) {
                    if (!visited.has(edge.target)) {
                        queue.push({node: edge.target, distance: current.distance + 1});
                    }
                }
            }

        }

        return undefined
    }

    longestBranchFromNode(node: GraphBaseNode, visited: Set<GraphBaseNode> = new Set()): number {
        visited.add(node);

        let maxDepth = 0;
        for (const edge of node.outgoingEdges) {
            if (!visited.has(edge.target) && edge instanceof GraphChainEdge && edge.sourceMode !== EConnectionMode.LoopInnerToChildren) {
                maxDepth = Math.max(maxDepth, this.longestBranchFromNode(edge.target, visited));
            }
        }


        return maxDepth + 1; // +1 to count the current node
    }

    findLongestBranch(nodes: GraphBaseNode[]): number {
        let maxLength = 0;
        for (const node of nodes) {
            maxLength = Math.max(maxLength, this.longestBranchFromNode(node));
        }

        return maxLength;
    }

    get isDiagramFinished() {
        return this.currentStep % this.diameter === 0
    }

    resetAfterDiagramRun() {
        if (this.isDiagramFinished) {
            console.log('resetAfterDiagramRun')
            this.graph.nodesManager.resetAfterDiagramRun();
        }
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
