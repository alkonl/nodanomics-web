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


    length({spreadsheetId}: {
        spreadsheetId: string,
    }) {
        const spreadsheet = this.getSpreadsheet({
            spreadsheetId,
        })
        if (spreadsheet) {
            try {
                return {
                    x: spreadsheet.columns.length,
                    y: spreadsheet.rows.length,
                }
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
        try {
            if (spreadsheet) {
                const updatedRows = [...spreadsheet.rows]; // Create a shallow copy of rows array
                if (!updatedRows[y]) {
                    const length = this.length({spreadsheetId});
                    const xLength = updatedRows[y]?.length || this.length({spreadsheetId})?.x || 0;
                    const yLength = length?.y || 0;
                    const fill = y - yLength + 1;
                    updatedRows.push(...Array(fill).fill(Array(xLength).fill(''))); // Add a new row if it doesn't exist
                }
                const updatedRow = [...updatedRows[y]]; // Create a shallow copy of the specific row

                // fill empty cells in the row
                if (!updatedRow[x] && x > 0) {
                    const fill = x - updatedRow.length + 1;
                    updatedRow.push(...Array(fill).fill('')); // Add a new cell if it doesn't exist
                }
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

        } catch (e) {
            console.error(`can't set value ${value} to spreadsheet ${spreadsheetId} at x:${x} y:${y}`, e)
        }
    }
}
