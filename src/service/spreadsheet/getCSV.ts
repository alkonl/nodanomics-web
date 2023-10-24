import {
    ISpreadsheetRowView,
    ISpreadsheetValueView,
    ISpreadsheetView
} from "../../interface/busines/spreadsheet/spreadsheetView";

export const getCSV = (spreadsheetView: ISpreadsheetView): Blob => {
    // Convert spreadsheet data to CSV format
    const csvData = spreadsheetView.rows.map((row: ISpreadsheetRowView) => {
        return row.values.map((value: ISpreadsheetValueView) => {
            // Escape double quotes and wrap each value in double quotes
            return `"${('content' in value ? value.content : '').replace(/"/g, '""')}"`;
        }).join(',');
    }).join('\r\n');

    // Convert CSV string to Blob
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    return blob;
};
