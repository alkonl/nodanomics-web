import {IFormulaNodeVariable, isIGetNodeExternalValue} from "../../../../interface";
import {GraphBaseEdge, GraphLogicEdge} from "../../GraphEdge";
import * as Match from "mathjs";

export class GraphMatchManager {
    private readonly incomingEdges: GraphBaseEdge[]

    constructor(incomingEdges: GraphBaseEdge[]) {
        this.incomingEdges = incomingEdges
    }

    getVariables(): IFormulaNodeVariable[] {
        return this.getIncomingLogicEdge.map((edge) => {

            //edge.source instanceof GraphVariableNode
            const source = edge.source
            if (isIGetNodeExternalValue(source)) {
                return {
                    variableName: edge.variableName,
                    value: source.nodeExternalValue,
                }
            }
        }).filter((variable) => variable !== undefined) as IFormulaNodeVariable[]
    }


    calculateFormula({formula}: { formula: string }) {
        try {
            if (formula) {
                const compiledFormula = Match.compile(formula)
                const variables = this.getVariables().reduce((acc: {
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

    private get getIncomingLogicEdge(): GraphLogicEdge[] {
        return this.incomingEdges.filter((edge) => {
            if (edge instanceof GraphLogicEdge) {
                return edge
            }
        }) as GraphLogicEdge[]
    }

}
