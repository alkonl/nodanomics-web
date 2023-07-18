import * as Match from "mathjs";
import {IFormulaNodeData, IFormulaNodeVariable, IFormulaResult} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphInvokableNode} from "./GraphInvokable";
import {GraphLogicEdge} from "../GraphEdge/GraphLogicEdge";
import {GraphPoolNode} from "./GraphPoolNode";

export class GraphFormulaNode extends GraphInvokableNode<IFormulaNodeData> {
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


    calculateFormula() {
        if (this.formula) {
            const compiledFormula = Match.compile(this.formula)
            const variables = this.getVariables().reduce((acc: {
                [key: string]: number
            }, variable) => {
                const variableName = variable.variableName || '-'
                acc[variableName] = variable.value
                return acc
            }, {})
            return compiledFormula.evaluate(variables)
        }
    }

    updateResult() {
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
        } else {
            throw new Error(`Unknown result type ${JSON.stringify(this.data)}`)
        }
    }

    updateVariables() {
        const variables = this.getVariables()
        this.setVariables(variables)
    }

    updateState() {
        this.updateVariables()
        this.updateResult()
    }

    setResult(result: IFormulaResult) {
        this._data = {
            ...this.data,
            result,
        }
    }

    setVariables(variables: IFormulaNodeVariable[]) {
        this._data = {
            ...this.data,
            variables,
        }
    }

    private get getIncomingLogicEdge(): GraphLogicEdge[] {
        return this.incomingEdges.filter((edge) => {
            if (edge instanceof GraphLogicEdge) {
                return edge
            }
        }) as GraphLogicEdge[]
    }

    private getVariables(): IFormulaNodeVariable[] {
        return this.getIncomingLogicEdge.map((edge) => {
            if (edge.source instanceof GraphPoolNode) {
                return {
                    variableName: edge.variableName,
                    value: edge.source.resourcesCount,
                }
            }
        }).filter((variable) => variable !== undefined) as IFormulaNodeVariable[]
    }

}
