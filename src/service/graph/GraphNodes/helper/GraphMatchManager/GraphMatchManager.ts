import * as Match from "mathjs";
import {INumberVariable} from "../../../../../interface";

export abstract class GraphMatchManager {
    calculateFormula({formula, variables}: { formula: string, variables: INumberVariable[] }) {
        try {
            if (formula) {
                const compiledFormula = Match.compile(formula)
                const mappedVariables = variables.reduce((acc: {
                    [key: string]: number
                }, variable) => {
                    const variableName = variable.variableName || '-'
                    if (variable.value) {
                        acc[variableName] = variable.value
                    }
                    return acc
                }, {})
                return compiledFormula.evaluate(mappedVariables)
            }
        } catch (e) {
            console.error(e)
        }

    }
}
