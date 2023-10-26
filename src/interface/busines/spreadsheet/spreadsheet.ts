export interface ISpreadsheetInfo {
    id: string;
    name: string;
    projectId: string;
    createdAt: string;
}

export type ISpreadsheetRowsData = (string | number)[][]

// here markers done
export interface IStructuredSpreadsheetData {
    xAxisIndex: number
    yAxisIndex: number
    name: string
    rows: ISpreadsheetRowsData
    columns: string[]
}

export interface IStructuredSpreadsheetsData {
    [key: string]: IStructuredSpreadsheetData,
}
