export interface IUpdateExistedValue {
    id: string;
    content: string;
}

export interface ICreateNewValue {
    content: string;
    rowIndex: number;
    columnIndex: number;
}


export interface IUpdateSpreadsheetRequests {
    spreadsheetId: string;
    existedCells: IUpdateExistedValue[]
    newCells: ICreateNewValue[]
}


