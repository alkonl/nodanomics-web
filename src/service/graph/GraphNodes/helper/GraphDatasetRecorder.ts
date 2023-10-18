import {GraphSpreadsheetManager} from "../../GraphSpreadsheetManager";
import {RunManager} from "../../RunManager";
import {GraphMatchManager} from "../../GraphMatchManager/GraphMatchManager";

export class GraphDatasetRecorder {
    private graphSpreadsheetManager: GraphSpreadsheetManager;
    private matchManager: GraphMatchManager;
    constructor(
        runManager: RunManager,
    ) {
        this.graphSpreadsheetManager = runManager.graph.spreadsheetManager;
        this.matchManager = new GraphMatchManager(runManager.graph.nodesManager, runManager.graph.graphTagManager)

    }
    recordToDataset(params: { value: string | number, spreadsheetId: string, x: string, y: string }) {
        // const datasetId = this.data.datasetReceiverId
        if (params.spreadsheetId && params.x !== undefined && params.y !== undefined) {
            const x = this.matchManager.calculateFormula({
                formula: params.x,
            })
            const y = this.matchManager.calculateFormula({
                formula: params.y,
            })
            this.graphSpreadsheetManager.setValue({
                spreadsheetId: params.spreadsheetId,
                x,
                y,
                value: params.value
            })
            const value = this.graphSpreadsheetManager.getValue({
                spreadsheetId: params.spreadsheetId,
                x,
                y
            })
            console.log(value)
        }

    }
}
