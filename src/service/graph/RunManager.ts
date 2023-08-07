import {Graph} from "./Graph";
import {GraphBaseNode, GraphInvokableNode, GraphLoopNode, GraphSourceNode, GraphVariableNode} from "./GraphNodes";
import {EConnection, EConnectionMode, ENodeTrigger, isUpdateGraphNodeState} from "../../interface";
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
        console.log('startedNodes', startedNodes.map(node => node.data.name))
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
        console.log(`getNodesChildrenRecursive.children ${node.data.name}`, children.map(node => node.data.name))

        nodes.forEach(child => {
            const toNextEdges = child.outgoingEdges.filter(edge => {
                console.log(`getNodesChildrenRecursive.targetMode ${child.data.name}`, edge.data.targetMode)
                if (edge.data.targetMode === EConnectionMode.LoopChildrenToExternal) {
                    return false
                }
                return true
            })
            console.log(`getNodesChildrenRecursive.toNextEdges ${child.data.name}`, toNextEdges.map(edge => edge.target.data.name))
            if (toNextEdges.length > 0) {
                this.getNodesChildrenRecursive(child, children)
            }
        })
        return children
    }

    private getNodesChildren(node: GraphBaseNode): GraphBaseNode[] {
        const children = node.outgoingEdges.map(edge => {
            return edge.target
        })
        return children.filter(item => item !== undefined) as GraphBaseNode[]
    }
}
