import {IStructuredSpreadsheetsData} from "../../../interface";

export class GraphSpreadsheetManager {

    private _spreadsheet?: IStructuredSpreadsheetsData;

    setSpreadsheets(spreadsheet: IStructuredSpreadsheetsData) {
        this._spreadsheet = spreadsheet;
    }

    getSpreadsheet({spreadsheetId}: {
        spreadsheetId: string,
    }) {
        return this._spreadsheet?.[spreadsheetId];
    }
}
