import {IFormulaNodeData, IFormulaNodeVariable, IFormulaResult, IUpdateGraphNodeState} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphInvokableNode} from "./abstracts";
import {GraphMatchManager} from "./helper";

export class GraphFormulaNode extends GraphInvokableNode<IFormulaNodeData>
    implements IUpdateGraphNodeState {

    private readonly matchManager: GraphMatchManager = new GraphMatchManager(this.incomingEdges)

    constructor(value: IFormulaNodeData, runManager: RunManager) {
        super(value, runManager);
    }

    get formula() {
        return this.data.formula;
    }

    get variable() {
        return this.data;
    }

    invokeStep() {
        this.updateState()
    }

    updateState() {
        this.updateVariables()
        this.updateResult()
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
                throw new Error(`Unknown result type ${JSON.stringify(this.data)} result: ${JSON.stringify(result)}`)
            }
        }
    }

    private updateVariables() {
        const variables = this.matchManager.getVariables()
        this.setVariables(variables)
    }


    private setResult(result: IFormulaResult) {
        this._data = {
            ...this.data,
            result,
        }
    }

    private setVariables(variables: IFormulaNodeVariable[]) {
        this._data = {
            ...this.data,
            variables,
        }
    }
}
