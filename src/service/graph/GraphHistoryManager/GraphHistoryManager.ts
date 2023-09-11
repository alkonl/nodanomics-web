import {GraphBaseNode} from "../GraphNodes";
import {IDiagramNodeBaseData, INodeHistory} from "../../../interface";

export class GraphHistoryManager {
    private node: GraphBaseNode<IDiagramNodeBaseData & INodeHistory>

    constructor(node: GraphBaseNode<IDiagramNodeBaseData & INodeHistory>) {
        this.node = node
    }

    updateHistory(value = 0) {
        const history = this.history
        const newHistory = history.length > 0
            ? [...history, value]
            : [value]
        this.node.updateNode({
            history: newHistory
        })
    }

    updateCurrentStepHistory(value = 0) {
        const step = this.node.runManager.currentStep
        const history = this.history
        const currentStepValue: number | undefined = history[step - 1]
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
}
