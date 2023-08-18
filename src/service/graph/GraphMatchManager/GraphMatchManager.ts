import * as Match from "mathjs";
import {INumberVariable, ISpreadsheetRowsData, IStructuredSpreadsheetData} from "../../../interface";
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

    datasetData({datasetTag}: { datasetTag: string }): IStructuredSpreadsheetData | undefined {
        const dataset = this.nodeManager.getNodeByTag({tag: datasetTag}) as GraphDatasetDatafieldNode
        return dataset?.spreadsheet
    }

    getDatasetRowsByTags({tags}: { tags: string[] }): { [tag: string]: ISpreadsheetRowsData } {
        const rowsPerTag: { [tag: string]: ISpreadsheetRowsData } = {}
        for (const tag of tags) {
            const dataset = this.datasetData({datasetTag: tag})
            if (dataset && dataset.rows) {
                rowsPerTag[tag] = [...dataset.rows]

            }
        }
        return rowsPerTag

    }

    calculateFormula({formula, variables}: {
        formula: string,
        variables: INumberVariable[]
    }) {
        try {
            if (formula) {
                const pattern = /(\w+)\[\d+\]\[\d+\]/g;

                const datasetTags = [...formula.matchAll(pattern)].map((match) => match[1])
                    .filter((value, index, self) => self.indexOf(value) === index);

                const transformedString = transformString(formula);

                const tagVariables = this.tagManager.getNodeTagVariables()
                const datasetRows = this.getDatasetRowsByTags({tags: datasetTags})
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
              const res =  compiledFormula.evaluate({...mappedVariables, ...datasetRows})
                if(typeof res === 'object' && 'entries' in res  && Array.isArray(res.entries)){
                    return res.entries[0]
                }
                return res
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
