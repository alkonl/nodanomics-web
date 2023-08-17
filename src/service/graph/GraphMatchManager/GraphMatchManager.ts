import * as Match from "mathjs";
import {INumberVariable, IStructuredSpreadsheetData} from "../../../interface";
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

     datasetData({datasetTag}: {datasetTag: string}):  IStructuredSpreadsheetData | undefined {
        const dataset = this.nodeManager.getNodeByTag({tag: datasetTag}) as GraphDatasetDatafieldNode
        return dataset?.spreadsheet
    }

    calculateFormula({formula, variables}: {
        formula: string,
        variables: INumberVariable[]
    }) {
        try {
            if (formula) {
                // const input = "(largerEq(playerMMR, mmrRangeDataset[0][6]) * smallerEq(playerMMR, mmrRangeDataset[1][6])";
                // const datasetVariables = this.getDatasetValues({formula}) || []
                // console.log('datasetVariables: ', datasetVariables)
                const inputString = "largerEq(playerMMR, mmrRangeDataset[0][0]) * smallerEq(playerMMR, mmrRangeDataset[1][0])";

                const transformedString = transformString(formula);

                console.log('transformedString: ', transformedString);
                const tagVariables = this.tagManager.getNodeTagVariables()
                const dataset = this.datasetData({datasetTag: 'mmrRangeDataset'})
                const allVariables = [...variables, ...tagVariables]
                const compiledFormula = Match.compile(transformedString)
                const mappedVariables = allVariables.reduce((acc: {
                    [key: string]: number
                }, variable) => {
                    const variableName = variable.variableName || '-'
                    if (variable.value) {
                        acc[variableName] = variable.value
                    }
                    return acc
                }, {})
                console.log('dataset: ', dataset?.rows)
                const pre = dataset?.rows || []
                const rows = [...pre]
                return compiledFormula.evaluate({...mappedVariables, mmrRangeDataset: rows})
            }
        } catch (e) {
            console.error(e)
        }

    }
}

function transformString(input: string): string {
    const pattern = /(\w+)\[(\d+)\]\[(\d+)\]/g;

    const transformed = input.replace(pattern, (match, variableName, num1, num2) => {
        const newNum1 = parseInt(num1) + 1;
        const newNum2 = parseInt(num2) + 1;
        return `${variableName}[${newNum2},${newNum1}]`;
    });

    return transformed;
}
