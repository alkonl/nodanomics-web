import {
    IFormulaNodeData,
    IFormulaResult,
    IGetNodeExternalValue,
    INumberVariable,
    IResetBeforeStep,
    IUpdateGraphNodeState,
    IUpdateGraphNodeStatePerStep,
    IUpdateStatePerNodeUpdate
} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphInvokableNode} from "./abstracts";
import {GraphDatasetRecorder, GraphLogicManager} from "./helper";
import {GraphNodeManager} from "../NodeManager";
import {GraphMatchManagerNode} from "../GraphMatchManager";
import {GraphHistoryManager} from "../GraphHistoryManager";

export class GraphFormulaNode extends GraphInvokableNode<IFormulaNodeData>
    implements IUpdateGraphNodeState, IGetNodeExternalValue, IUpdateGraphNodeStatePerStep, IResetBeforeStep,
        IUpdateStatePerNodeUpdate {

    private readonly matchManager: GraphMatchManagerNode
    private readonly logicManager: GraphLogicManager = new GraphLogicManager(this.incomingEdges);
    private readonly historyManager: GraphHistoryManager = new GraphHistoryManager(this, this.nodeManager);
    private graphDatasetRecorder: GraphDatasetRecorder = new GraphDatasetRecorder(this.runManager)

    constructor(value: IFormulaNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
        this.matchManager = new GraphMatchManagerNode(this.incomingEdges, nodeManager, this.runManager.graph.graphTagManager)
    }


    get formula() {
        return this.data.formula;
    }

    get history() {
        return this.data.history
    }

    get nodeExternalValue() {
        if (typeof this.result?.value === 'number') {
            return this.result?.value
        }
    }

    get result() {
        return this.data.result;
    }

    invokeStep() {
        super.invokeStep()
        this.updateState()
        this.recordToDataset()
    }

    updateState() {
        super.updateState()
        this.updateVariables()
        this.updateResult()
    }

    updateStatePerStep() {
        if (!this.nodeManager.assignedHistoryNode) {
            this.updateHistory()
        }
    }

    updateStatePerNodeUpdate() {
        if (this.nodeManager.assignedHistoryNode) {
            this.updateHistory()
        }
    }

    private updateResult() {
        if (this.formula) {
            const result = this.matchManager.calculateFormula({
                formula: this.formula,
            })
            if (typeof result === 'boolean') {
                this.setResult({
                    type: 'boolean',
                    value: result,
                })
            } else if (typeof result === 'number') {
                this.setResult({
                    type: 'number',
                    value: result,
                })
            } else if (result !== undefined) {
                console.error(`Unknown result type ${JSON.stringify(this.data)} result: ${JSON.stringify(result, null, 2)}`)
            }
        }
    }


    private recordToDataset() {
        if (this.data.datasetX && this.data.datasetY && this.data.datasetReceiverId && this.result?.value && this.result?.type === 'number' ) {
            this.graphDatasetRecorder.recordToDataset({
                value: this.result.value,
                spreadsheetId: this.data.datasetReceiverId,
                x: this.data.datasetX,
                y: this.data.datasetY
            })
        }
    }

    private updateVariables() {
        const variables = this.logicManager.getVariables()
        this.setVariables(variables)
    }


    private setResult(result: IFormulaResult) {
        this._data = {
            ...this.data,
            result,
        }
    }

    private setVariables(variables: INumberVariable[]) {
        this._data = {
            ...this.data,
            variables,
        }
    }

    private updateHistory() {
        const result = this.result
        if (result?.type === 'number') {
            this.historyManager.updateHistory(result.value)
        }
    }
}
