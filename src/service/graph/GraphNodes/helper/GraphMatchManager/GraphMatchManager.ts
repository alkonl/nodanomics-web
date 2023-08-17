import * as Match from "mathjs";
import {INumberVariable} from "../../../../../interface";
import {GraphNodeManager} from "../../../NodeManager";

export abstract class GraphMatchManager {

    private readonly nodeManager: GraphNodeManager

    constructor(nodeManager: GraphNodeManager) {
        this.nodeManager = nodeManager
    }

    getValueFromDataset({datasetTag, x, y}: { datasetTag: string, x: number, y: number }) {
        const dataset = this.nodeManager.getDatasetByTag({tag: datasetTag})
        if (dataset) {
            const value = dataset?.getValue({x, y})
        }

    }

    calculateFormula({formula, variables}: { formula: string, variables: INumberVariable[] }) {
        try {
            if (formula) {
                this.getValueFromDataset({datasetTag: 'test', x: 2, y: 1})
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
