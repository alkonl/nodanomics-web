import {Graph} from "./Graph";
import {GraphBaseNode, GraphInvokableNode, GraphSourceNode, GraphVariableNode} from "./GraphNodes";
import {ENodeTrigger, isUpdateGraphNodeState} from "../../interface";
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
        this.sortedNodes().forEach(node => {
            if (node instanceof GraphInvokableNode) {
                node.invokeStep()
                this.invokedNodes.add(node)
            }
        })
        this.updateTriggeredNodes()
        this.graph.nodes.forEach(node => {
            if (node instanceof GraphVariableNode) {
                node.updateRecoursesProvide()
            }
        })
        this.invokedNodes.clear()
    }
    private updateTriggeredNodes() {
        this.newTriggeredNodes.forEach(node => {
            if (node instanceof GraphInvokableNode) {
                node.invokeStep()
                this.invokedNodes.add(node)
            }
        })
        if(this.updateTriggeredNodes.length > 0){
            this.updateTriggeredNodes()
        }
    }

    private get newTriggeredNodes() {
        const triggered = this.triggerEventListeners.filter(eventListener => eventListener.checkIsEventTriggered())
        const nodes = triggered.map(node => {
            return this.getNodesChildrenRecursive(node)
        })
        return nodes.flat()
    }

    get triggerEventListeners(): GraphEventListenerNode[] {
        return this.graph.nodes.filter(node => node instanceof GraphEventListenerNode) as GraphEventListenerNode[]
    }


    private incrementStep() {
        this._currentStep++
    }

    private sortedNodes() {
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
        return sortedNodes.reverse().flat()
    }

    private getNodesChildrenRecursive(node: GraphBaseNode, children: GraphBaseNode[] = [node]) {
        const nodes = this.getNodesChildren(node)
        nodes.forEach(child => {
            if (!children.includes(child) && !this.invokedNodes.includes(child)) {
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

    private getNodesChildren(node: GraphBaseNode) {
        const children = node.outgoingEdges.map(edge => edge.target)
        return children as GraphBaseNode[]
    }
}
