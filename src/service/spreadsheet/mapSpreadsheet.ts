import {IGetSpreadsheetResponse, IStructuredSpreadsheetData} from "../../interface";

export const mapSpreadsheet = (spreadsheet: IGetSpreadsheetResponse): IStructuredSpreadsheetData => {
    // find y column index, where rows starts
    const yAxisIndex = spreadsheet.rows.findIndex((cells) => cells.values.some((cell) => cell.content === 'Y Axis'))

    // find x column index, where columns starts
    let xAxisIndex = 0
    spreadsheet.rows.find((cells, index) => {
        if (cells.values.some((cell) => cell.content === 'X Axis')) {
            xAxisIndex = index
            return true
        }
    })

    // const yAxisIndex = spreadsheet.rows.findIndex((cells) => cells.values.some((cell) => cell.content === 'Y Axis'))

    const columns = spreadsheet.rows[yAxisIndex]?.values
        .map((cell) => cell.content)
        .filter((content) => content !== 'Y Axis')

    const rows: (string | number)[][] = [];

    for (let i = yAxisIndex + 1; i < spreadsheet.rows.length; i++) {
        const row = spreadsheet.rows[i];
        const newRow: (string | number)[] = [];

        for (let j = xAxisIndex + 1; j < row.values.length; j++) {
            const cell = row.values[j];
            const numContent = Number(cell.content);

            if (!isNaN(numContent)) {
                newRow.push(numContent);
            } else {
                newRow.push(cell.content);
            }
        }

        rows.push(newRow);
    }

    return {
        name: spreadsheet.name,
        xAxisIndex,
        yAxisIndex,
        rows,
        columns,
    }
}
