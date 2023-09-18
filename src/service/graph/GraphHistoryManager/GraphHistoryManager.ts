import {GraphBaseNode} from "../GraphNodes";
import {IDiagramNodeBaseData, INodeHistory} from "../../../interface";
import {GraphNodeManager} from "../NodeManager";

export class GraphHistoryManager {

    private node: GraphBaseNode<IDiagramNodeBaseData & INodeHistory>
    private nodeManager: GraphNodeManager

    constructor(node: GraphBaseNode<IDiagramNodeBaseData & INodeHistory>, nodeManager: GraphNodeManager) {
        this.node = node
        this.nodeManager = nodeManager
    }

    updateHistory(value = 0) {
        const history = this.history.slice(0, this.step)
        const newHistory = history.length > 0
            ? [...history, value]
            : [value]
        this.node.updateNode({
            history: newHistory
        })
    }

    updateCurrentStepHistory(value = 0) {
        if (this.nodeManager.assignedHistoryNode && this.nodeManager.assignedNodeChanged) {
            this.updateCurrentStepHistoryValue(value)
        } else if (!this.nodeManager.assignedHistoryNode) {
            this.updateCurrentStepHistoryValue(value)
        }

    }

    private updateCurrentStepHistoryValue(value = 0) {
        const history = this.history
        const currentStepValue: number | undefined = history[this.step]
        const newValue = currentStepValue ? currentStepValue + value : value
        this.updateHistory(newValue)
    }

    get history() {
        return this.node.data.history
    }

    get max() {
        return Math.max(...this.history)
    }

    get min() {
        return Math.min(...this.history)
    }

    private get step(): number {
        const assignedHistoryNode = this.nodeManager.assignedHistoryNode
        return assignedHistoryNode
            ? assignedHistoryNode.changeCount
            : this.node.runManager.currentStep
    }
}
