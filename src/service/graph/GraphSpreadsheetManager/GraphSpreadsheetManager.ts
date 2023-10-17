import {IStructuredSpreadsheetsData} from "../../../interface";

export class GraphSpreadsheetManager {

    private _spreadsheets?: IStructuredSpreadsheetsData;

    setSpreadsheets(spreadsheet: IStructuredSpreadsheetsData) {
        this._spreadsheets = spreadsheet;
    }

    get spreadsheets() {
        return this._spreadsheets;
    }

    getSpreadsheet({spreadsheetId}: {
        spreadsheetId: string,
    }) {
        return this._spreadsheets?.[spreadsheetId];
    }

    getValue({spreadsheetId, x, y}: {
        spreadsheetId: string,
        x: number,
        y: number,
    }) {
        const spreadsheet = this.getSpreadsheet({
            spreadsheetId,
        })
        if (spreadsheet) {
            try {
                return spreadsheet.rows[y][x]
            } catch (e) {
                console.error(e)
            }
        }
    }

    setValue({spreadsheetId, x, y, value}: {
        spreadsheetId: string,
        x: number,
        y: number,
        value: string | number,
    }) {
        const spreadsheet = this.getSpreadsheet({
            spreadsheetId,
        });

        if (spreadsheet) {
            const updatedRows = [...spreadsheet.rows]; // Create a shallow copy of rows array
            const updatedRow = [...updatedRows[y]]; // Create a shallow copy of the specific row

            updatedRow[x] = value; // Update the value in the copied row

            updatedRows[y] = updatedRow; // Update the copied row in the copied rows array

            const updatedSpreadsheet = {
                ...spreadsheet,
                rows: updatedRows, // Update the rows in the copied spreadsheet
            };
            this._spreadsheets = {
                ...this._spreadsheets,
                [spreadsheetId]: updatedSpreadsheet,
            }

        }
    }
}
