import {Graph} from "./Graph";
import {GraphBaseNode, GraphInvokableNode, GraphSourceNode, GraphVariableNode} from "./GraphNodes";
import {EConnection, ENodeTrigger, isUpdateGraphNodeState} from "../../interface";
import {GraphEventListenerNode} from "./GraphNodes/GraphEventListenerNode";

export type IReason = {
    node: GraphBaseNode
    trigger?: EConnection
}

export class RunManager {
    private graph: Graph
    private _currentStep = 0
    private invokedNodes: IReason[] = []

    // private update

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

    invokeStep() {
        console.log('invokeStep', this.graph)
        this.incrementStep()
        const nodes = this.sortedNodes()
        console.log('nodes', nodes)
        nodes.forEach(toInvoke => {
            const node = toInvoke.node
            if (node instanceof GraphInvokableNode) {
                node.invokeStep()
                this.invokedNodes.push(toInvoke)
            }
        })
        // this.updateTriggeredNodes()
        this.graph.nodes.forEach(node => {
            if (node instanceof GraphVariableNode) {
                node.updateRecoursesProvide()
            }
        })
        this.invokedNodes = []
    }


    private incrementStep() {
        this._currentStep++
    }

    private sortedNodes(): IReason[] {
        const startedNodes = this.graph.nodes.filter(node => {
            if (node instanceof GraphSourceNode) {
                if (node.triggerMode === ENodeTrigger.enabling || node.triggerMode === ENodeTrigger.passive) {
                    return node.hasEventListeners
                }
                return node
            } else if (node instanceof GraphEventListenerNode) {
                return node
            }
        })

        const sortedNodes = startedNodes.map(source => {
            return this.getNodesChildrenRecursive(source)
        })
        console.log('sortedNodes', sortedNodes.map(nodes => nodes.map(node => node.node.data.name)))
        // nodes queue that start from trigger listener invoke in last step
        return sortedNodes.sort((a, b) => {
            const aFirstNode = a[0].node
            const bFirstNode = b[0].node
            if (aFirstNode instanceof GraphEventListenerNode && !(bFirstNode instanceof GraphEventListenerNode)) {
                return 1
            } else if (!(aFirstNode instanceof GraphEventListenerNode) && bFirstNode instanceof GraphEventListenerNode) {
                return -1
            }
            return 0
        }).flat()
    }

    private getNodesChildrenRecursive(node: GraphBaseNode, children: IReason[] = [{
        node,
    }]) {
        const nodes = this.getNodesChildren(node)
        nodes.forEach(child => {
            if (!children.includes(child) && !this.invokedNodes.includes(child)) {
                children.push(child)
            }
        })
        nodes.forEach(child => {
            if (child.node.outgoingEdges.length > 0) {
                this.getNodesChildrenRecursive(child.node, children)
            }
        })
        return children
    }

    private getNodesChildren(node: GraphBaseNode): IReason[] {
        const children = node.outgoingEdges.map(edge => {
            const target = edge.target
            const isHasEventConnection = target.outgoingEdges.some(edge => edge.type === EConnection.EventConnection)
            const isHasOtherConnectionThenEvent = target.outgoingEdges.some(edge => edge.type !== EConnection.EventConnection)
            const isHasOutgoingEdges = target.outgoingEdges.length > 0
            console.log('target:', target.data.name)
            if (!isHasOutgoingEdges) {
                return {
                    node: edge.target,
                    trigger: edge.type
                }
            }
            if (isHasEventConnection && isHasOtherConnectionThenEvent && edge.type === EConnection.EventConnection) {
                return {
                    node: edge.target,
                    trigger: edge.type
                }
            }
            console.log(`isHasOtherConnectionThenEvent: ${node.data.name}`, isHasOtherConnectionThenEvent, edge)
            if (!isHasEventConnection) {
                return {
                    node: edge.target,
                    trigger: edge.type
                }
            }
        })
        return children.filter(item => item !== undefined) as IReason[]
    }
}
