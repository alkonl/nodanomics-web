import * as Match from "mathjs";
import {IFormulaNodeData, IFormulaNodeVariable, IFormulaResult, IUpdateGraphNodeState} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphInvokableNode} from "./abstracts";
import {GraphVariableManager} from "./helper";

export class GraphFormulaNode extends GraphInvokableNode<IFormulaNodeData>
    implements IUpdateGraphNodeState {

    private readonly variableManager: GraphVariableManager = new GraphVariableManager(this.incomingEdges)

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

    private calculateFormula() {
        try {
            if (this.formula) {
                const compiledFormula = Match.compile(this.formula)
                const variables = this.variableManager.getVariables().reduce((acc: {
                    [key: string]: number
                }, variable) => {
                    const variableName = variable.variableName || '-'
                    acc[variableName] = variable.value
                    return acc
                }, {})
                return compiledFormula.evaluate(variables)
            }
        } catch (e) {
            console.error(e)
        }

    }

    private updateResult() {
        const result = this.calculateFormula()
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

    private updateVariables() {
        const variables = this.variableManager.getVariables()
        console.log('variables', variables)
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
