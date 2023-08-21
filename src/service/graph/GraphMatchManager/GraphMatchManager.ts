import * as Match from "mathjs";
import {IMatchManagerObject, INumberVariable, ISpreadsheetRowsData} from "../../../interface";
import {GraphNodeManager} from "../NodeManager";
import {GraphDatasetDatafieldNode, GraphTagManager} from "../GraphNodes";
import {GraphMatchNodeAdapter} from "./GraphMatchNodeAdapter";


export abstract class GraphMatchManager {

    private readonly nodeManager: GraphNodeManager
    private readonly tagManager: GraphTagManager

    constructor(nodeManager: GraphNodeManager) {
        this.nodeManager = nodeManager
        this.tagManager = new GraphTagManager(nodeManager)
    }

    datasetData({datasetTag}: { datasetTag: string }): GraphDatasetDatafieldNode | undefined {
        return this.nodeManager.getNodeByTag({tag: datasetTag}) as GraphDatasetDatafieldNode
    }

    getDatasetRowsByTags({tags}: { tags: string[] }) {
        const rowsPerTag: { [tag: string]: ISpreadsheetRowsData } = {}
        const datasetPerTag: { [tag: string]: IMatchManagerObject } = {}
        for (const tag of tags) {
            const dataset = this.datasetData({datasetTag: tag})
            if (dataset && dataset.spreadsheet && dataset.spreadsheet?.rows) {
                rowsPerTag[tag] = [...dataset.spreadsheet.rows]
                datasetPerTag[`__${tag}`] = GraphMatchNodeAdapter.adapt(dataset)
            }
        }
        return {rowsPerTag, datasetPerTag}
    }

    calculateFormula({formula, variables}: {
        formula: string,
        variables: INumberVariable[]
    }) {

        // pattern to get dataset tags from formula (mmrRangeDataset.lengthX, mmrRangeDataset[1][2])
        const datasetPattern = /(\w+)(?:\.\w+|\[\d+\])+/g;
        const datasetTags = [...formula.matchAll(datasetPattern)].map((match) => match[1])
            .filter((value, index, self) => self.indexOf(value) === index);
        const {rowsPerTag: datasetRows, datasetPerTag} = this.getDatasetRowsByTags({tags: datasetTags})
        const transformedString = this.transformString(formula);
        try {

            if (formula) {
                const tagVariables = this.tagManager.getNodeTagVariables()
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

                const res = compiledFormula.evaluate({...mappedVariables, ...datasetRows, ...datasetPerTag})
                if (typeof res === 'object' && 'entries' in res && Array.isArray(res.entries)) {
                    return res.entries[0]
                }
                return res
            }
        } catch (e) {
            console.error(e, {transformedString}, {variables}, {datasetTags}, {datasetRows})
        }
    }

    transformString(input: string): string {
        const pattern = /\[(\d+)\]\[(\d+)\]/g;

        const transformed = input.replace(pattern, (match,  num1, num2) => {
            const newNum1 = parseInt(num1) + 1;
            const newNum2 = parseInt(num2) + 1;
            return `[${newNum2},${newNum1}]`;
        });


        // replace dataset tags with __datasetTag
        return transformed.replace(/(\w+\.\w+)/g, "__$1");
    }
}

