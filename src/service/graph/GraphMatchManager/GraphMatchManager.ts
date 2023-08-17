import * as Match from "mathjs";
import {INumberVariable} from "../../../interface";
import {GraphNodeManager} from "../NodeManager";
import {GraphDatasetDatafieldNode} from "../GraphNodes/GraphDatasetDatafieldNode";
import {GraphTagManager} from "../GraphNodes";


export abstract class GraphMatchManager {

    private readonly nodeManager: GraphNodeManager
    private readonly tagManager: GraphTagManager

    constructor(nodeManager: GraphNodeManager) {
        this.nodeManager = nodeManager
        this.tagManager = new GraphTagManager(nodeManager)
    }

    getValueFromTag({tag}: { tag: string }) {
        this.tagManager.getNodeValueByTag({tag})
    }

    getValueFromDataset({datasetTag, x, y}: { datasetTag: string, x: number, y: number }) {
        const dataset = this.nodeManager.getNodeByTag({tag: datasetTag})
        if (dataset && dataset instanceof GraphDatasetDatafieldNode) {
            const value = dataset?.getValue({x, y})
        }

    }

    calculateFormula({formula, variables}: { formula: string, variables: INumberVariable[] }) {
        try {
            if (formula) {
                const tagVariables = this.tagManager.getNodeTagVariables()
                const allVariables = [...variables, ...tagVariables]
                const compiledFormula = Match.compile(formula)
                const mappedVariables = allVariables.reduce((acc: {
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
