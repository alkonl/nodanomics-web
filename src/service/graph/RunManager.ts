import {Graph} from "./Graph";
import {GraphBaseNode, GraphDataNode, GraphEventListenerNode, GraphInvokableNode, GraphStartNode} from "./GraphNodes";
import {EConnection, EConnectionMode, isUpdateGraphNodeState} from "../../interface";
import {GraphNodeManager} from "./NodeManager";
import {GraphChainEdge, GraphDataEdge} from "./GraphEdge";

export class RunManager {
    private graph: Graph
    private _currentStep = 0
    private invokedNodes: GraphNodeManager = new GraphNodeManager()

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
        const nodes = this.sortedNodes()
        nodes.forEach(node => {
            if (isUpdateGraphNodeState(node)) {
                node.updateState()
            }
        })
    }

    invokeStep() {
        this.incrementStep()
        this.resetIsTransferredResources()
        const nodes = this.sortedNodes()
        nodes.forEach(node => {
            if (node instanceof GraphInvokableNode) {
                node.invokeStep()
                this.invokedNodes.add(node)
            }
        })
        this.updateState()
        this.graph.nodes.forEach(node => {
            if (node instanceof GraphDataNode) {
                node.updateRecoursesProvide()
            }
        })
        this.invokedNodes.clear()
    }


    private incrementStep() {
        this._currentStep++
    }

    private getStartedNodes() {
        const startNodes = this.graph.nodes.filter(node =>{
            if (node instanceof GraphStartNode || node instanceof GraphEventListenerNode) {
                return node
            }
        })
        return startNodes
        // if (startNode && startNode instanceof GraphStartNode) {
        //     return startNode
        // }
        // throw new Error('Start node not found')
        // return this.graph.nodes.filter(node => {
        //     if (node instanceof GraphOriginNode) {
        //         if (node.triggerMode === ENodeTrigger.enabling || node.triggerMode === ENodeTrigger.passive) {
        //             return node.hasEventListeners
        //         }
        //         return node
        //     } else if (node instanceof GraphEventListenerNode) {
        //         return node
        //     }
        // })
    }

    private sortedNodes(): GraphBaseNode[] {
        const startedNodes = this.getStartedNodes()
        console.log('startedNodes: ', startedNodes)
        const childrenNodes = startedNodes.map(source => {
            return this.getNodesChildrenRecursive(source)
        })
        // nodes queue that start from trigger listener invoke in last step
        return childrenNodes.sort((a, b) => {
            const aFirstNode = a[0]
            const bFirstNode = b[0]
            if (aFirstNode instanceof GraphEventListenerNode && !(bFirstNode instanceof GraphEventListenerNode)) {
                return -1
            } else if (!(aFirstNode instanceof GraphEventListenerNode) && bFirstNode instanceof GraphEventListenerNode) {
                return 1
            }
            return 0
        }).flat()
    }

    private getNodesChildrenRecursive(node: GraphBaseNode, children: GraphBaseNode[] = [node]) {
        const nodes = this.getNodesChildren(node)

        nodes.forEach(child => {
            if (!children.includes(child)) {
                children.push(child)
            }
        })

        nodes.forEach(child => {

            const toNextEdges = child.outgoingEdges.filter(edge => {
                // if (edge.data.targetMode === EConnectionMode.LoopChildrenToExternal) {
                //     return false
                // }
                return true
            })
            if (toNextEdges.length > 0) {
                this.getNodesChildrenRecursive(child, children)
            }
        })
        return children
    }

    private getNodesChildren(node: GraphBaseNode): GraphBaseNode[] {
        const children = node.outgoingEdges.map(edge => {
            const target = edge.target
            if (edge instanceof GraphChainEdge) {
                return target
            }
            // const isHasEventIncomingConnection = target.incomingEdges.some(edge => edge.type === EConnection.ChainConnection)
            // const isHasOtherIncomingConnectionThenEvent = target.incomingEdges.some(edge => edge.type !== EConnection.ChainConnection)
            // const isHasIncomingEdges = target.incomingEdges.length > 0
            // if (!isHasIncomingEdges) {
            //     return edge.target
            // }
            // if (isHasEventIncomingConnection && isHasOtherIncomingConnectionThenEvent && edge.type === EConnection.ChainConnection) {
            //     return edge.target
            // }
            //
            // if (isHasEventIncomingConnection && edge.type === EConnection.ChainConnection) {
            //     return edge.target
            // }
            //
            // if (!isHasEventIncomingConnection) {
            //     return edge.target
            // }

        })
        return children.filter(item => item !== undefined) as GraphBaseNode[]
    }

    private resetIsTransferredResources() {
        this.graph.edges.forEach(edge => {
            if (edge instanceof GraphDataEdge) {
                edge.changeIsTransferredResources(false)
            }
        })
    }
}
