import {Graph} from "./Graph";
import {GraphBaseNode, GraphInvokableNode, GraphSourceNode, GraphVariableNode} from "./GraphNodes";
import {EConnection, ENodeTrigger, isUpdateGraphNodeState} from "../../interface";
import {GraphEventListenerNode} from "./GraphNodes/GraphEventListenerNode";
import {GraphNodeManager} from "./NodeManager";

export class RunManager {
    private graph: Graph
    private _currentStep = 0
    private invokedNodes: GraphNodeManager = new GraphNodeManager()

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
        // const nodes = this.sortedNodes()
        // nodes.forEach(node => {
        //     if (isUpdateGraphNodeState(node)) {
        //         node.updateState()
        //     }
        // })
        const nodes = this.sortedNodes()
        // const formulaNodes = startedNodes.map(node => {
        //     return this.recursiveGetAllFormulaNodes(node)
        // }).flat().filter(item => item instanceof GraphFormulaNode)
        console.log('formulaNodes', nodes.map(node => node.data.name))
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
        console.log('nodes', nodes.map(node => node.data.name))
        nodes.forEach(node => {
            if (node instanceof GraphInvokableNode) {
                node.invokeStep()
                this.invokedNodes.add(node)
            }
        })
        this.updateState()
        this.graph.nodes.forEach(node => {
            if (node instanceof GraphVariableNode) {
                node.updateRecoursesProvide()
            }
        })
        this.invokedNodes.clear()
    }


    private incrementStep() {
        this._currentStep++
    }

    private getStartedNodes(): GraphBaseNode[] {
        return this.graph.nodes.filter(node => {
            if (node instanceof GraphSourceNode) {
                if (node.triggerMode === ENodeTrigger.enabling || node.triggerMode === ENodeTrigger.passive) {
                    return node.hasEventListeners
                }
                return node
            } else if (node instanceof GraphEventListenerNode) {
                return node
            }
        })
    }

    private sortedNodes(): GraphBaseNode[] {
        const startedNodes = this.getStartedNodes()
        const childrenNodes = startedNodes.map(source => {
            return this.getNodesChildrenRecursive(source)
        })
        console.log('childrenNodes', childrenNodes.map(nodes => nodes.map(node => node.data.name)))
        // nodes queue that start from trigger listener invoke in last step
        const sortedQueue = childrenNodes.sort((a, b) => {
            const aFirstNode = a[0]
            const bFirstNode = b[0]
            if (aFirstNode instanceof GraphEventListenerNode && !(bFirstNode instanceof GraphEventListenerNode)) {
                return -1
            } else if (!(aFirstNode instanceof GraphEventListenerNode) && bFirstNode instanceof GraphEventListenerNode) {
                return 1
            }
            return 0
        }).flat()
        return sortedQueue
    }

    private getNodesChildrenRecursive(node: GraphBaseNode, children: GraphBaseNode[] = [node]) {
        const nodes = this.getNodesChildren(node)
        nodes.forEach(child => {
            if (!children.includes(child)) {
                children.push(child)
            }
        })
        nodes.forEach(child => {
            if (child.outgoingEdges.length > 0) {
                this.getNodesChildrenRecursive(child, children)
            }
        })
        return children
    }

    private getNodesChildren(node: GraphBaseNode): GraphBaseNode[] {
        const children = node.outgoingEdges.map(edge => {
            const target = edge.target
            const isHasEventConnection = target.outgoingEdges.some(edge => edge.type === EConnection.EventConnection)
            const isHasOtherConnectionThenEvent = target.outgoingEdges.some(edge => edge.type !== EConnection.EventConnection)
            const isHasOutgoingEdges = target.outgoingEdges.length > 0
            console.log('target:', target.data.name)
            if (!isHasOutgoingEdges) {
                return edge.target
            }
            if (isHasEventConnection && isHasOtherConnectionThenEvent && edge.type === EConnection.EventConnection) {
                return edge.target
            }
            if (isHasEventConnection && edge.type === EConnection.EventConnection) {
                return edge.target
            }
            console.log(`isHasOtherConnectionThenEvent: ${node.data.name}`, isHasOtherConnectionThenEvent, edge)
            if (!isHasEventConnection) {
                return edge.target
            }
        })
        return children.filter(item => item !== undefined) as GraphBaseNode[]
    }

    private recursiveGetAllFormulaNodes(node: GraphBaseNode, nodes: GraphBaseNode[] = []) {
        const children = this.getNodesChildren(node)
        children.forEach(child => {
            if (!nodes.includes(child)) {
                nodes.push(child)
            }
        })
        children.forEach(child => {
            if (child.outgoingEdges.length > 0) {
                this.recursiveGetAllFormulaNodes(child, nodes)
            }
        })
        return nodes
    }
}
