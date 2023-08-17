export interface ISpreadsheetInfo {
    id: string;
    name: string;
    projectId: string;
    createdAt: string;
}

export interface IStructuredSpreadsheetData {
    xAxisIndex: number
    yAxisIndex: number
    name: string
    rows: (string | number)[][]
}

export interface IStructuredSpreadsheetsData {
    [key: string]: IStructuredSpreadsheetData
}
