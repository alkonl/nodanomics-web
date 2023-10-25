import * as XLSX from 'xlsx';
import {
    ISpreadsheetRowView,
    ISpreadsheetValueView,
    ISpreadsheetView
} from "../../interface/busines/spreadsheet/spreadsheetView";
import {stringToArrayBuffer} from "../../utils";



export const getExcelSpreadsheet = (spreadsheetView: ISpreadsheetView): Blob => {
    const workBook = XLSX.utils.book_new();
    workBook.Props = {
        Title: spreadsheetView.name,
        CreatedDate: new Date(spreadsheetView.createdAt),
    };

    const ws_data = spreadsheetView.rows.map((row: ISpreadsheetRowView) => {
        return row.values.map((value: ISpreadsheetValueView) => {
            if ('content' in value) {
                return value.content;
            }
            return '';
        });
    });
    const workSheet = XLSX.utils.aoa_to_sheet(ws_data);

    const merges = [];
    for (const row of spreadsheetView.rows) {
        for (const value of row.values) {
            if ('merge' in value && value.merge) {
                merges.push({
                    s: {c: value.merge.s.c, r: value.merge.s.r},
                    e: {c: value.merge.e.c, r: value.merge.e.r}
                });
            }
        }
    }

    workSheet['!merges'] = merges;

    XLSX.utils.book_append_sheet(workBook, workSheet, spreadsheetView.name);

    const workBookBlob = XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });
    return  new Blob([stringToArrayBuffer(workBookBlob)], { type: 'application/octet-stream' });
};


