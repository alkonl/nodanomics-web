import {GraphBaseNode} from "./abstracts";
import {IDatasetDatafield} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";
import {GraphSpreadsheetManager} from "../GraphSpreadsheetManager";
import {findIndex2D} from "../../../utils";


export class GraphDatasetDatafieldNode extends GraphBaseNode<IDatasetDatafield> {

    private spreadsheetManager: GraphSpreadsheetManager

    constructor(
        value: IDatasetDatafield,
        runManager: RunManager,
        nodeManager: GraphNodeManager,
        spreadsheetManager: GraphSpreadsheetManager
    ) {
        super(value, runManager, nodeManager);
        this.spreadsheetManager = spreadsheetManager;
    }

    updateState() {
        super.updateState();
        const dataSetVariables = this.getDynamicVariables()
        this.updateNode({
            namedVariables: dataSetVariables
        })
        console.log('dataSetVariables', dataSetVariables)
    }

    get spreadsheet() {
        if (this.data.datasetId) {
            return this.spreadsheetManager.getSpreadsheet({
                spreadsheetId: this.data.datasetId,
            });
        }
    }

    get lengthY() {
        return this.spreadsheet?.rows.length
    }

    get lengthX() {
        // max length of rows
        return this.spreadsheet?.rows.reduce((acc, row) => {
            return Math.max(acc, row.length)
        }, 0)
    }

    indexOf(value: string | number): undefined | [number, number] {
        if (this.spreadsheet?.rows) {
            return findIndex2D(this.spreadsheet?.rows, value)
        }
    }

    where(value: string | number): undefined | [number, number][] {
        if (this.spreadsheet?.rows) {
            return this.spreadsheet?.rows.reduce((acc: [number, number][], row, y) => {
                const x = row.indexOf(value)
                if (x >= 0) {
                    acc.push([x, y])
                }
                return acc
            }, [])
        }
    }


    get yOffset() {
        return (this.spreadsheet?.yAxisIndex || 0) + 1
    }

    get xOffset() {
        return (this.spreadsheet?.xAxisIndex || 0)
    }

    getValue(coordinates: {
        x: number,
        y: number,
    }) {
        try {
            const x = coordinates.x + this.xOffset
            const y = coordinates.y + this.yOffset
            return this.spreadsheet?.rows[y][x]
        } catch (e) {
            console.error(e)
        }
    }


    getDynamicVariables() {
        return this.spreadsheet?.rows.reduce((acc: {
            [key: string]: number | boolean
        }, row) => {
            const newRow = this.buildRow(row)
            return {
                ...acc,
                ...newRow,
            }
        }, {})
    }

    getColumns() {
        return this.spreadsheet?.columns
    }

    private buildRow(row: (string | number | boolean)[]) {
        const columns = this.getColumns();
        const object: { [key: string]: number | boolean } = {};

        const anchors = row.filter(value => typeof value === 'string') as string[];

        anchors.forEach(anchor => {
            row.forEach((value, index) => {
                const columnName = columns?.[index];
                if (typeof value !== 'string' && columnName) {
                    const name = this.composeObjectName(anchor, columnName);
                    object[name] = value;
                }
            });
        });
        return object;
    }

    private composeObjectName(achor: string, columnName: string) {
        return `${achor}${columnName}`
            .replace(/\s+(\w)/g, (_, match) => match.toUpperCase())
            .replace(/^\w/, match => match.toLowerCase())
            .trim()
    }

}
