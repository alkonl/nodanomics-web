export interface ISpreadsheetNewValueView {
    content: string;
    isNew: boolean;
    // index shows the order of the row after the last existing row
    rowIndex: number;
    // index shows the order of the column after the last existing column
    columnIndex: number;
}

export interface ISpreadsheetExistedValueView {
    content: string;
    id: string;
    rowId: string;
    merge?: {
        s: {
            c: number;
            r: number;
        };
        e: {
            c: number;
            r: number;
        };
    }
    columnId: string | null;
    isChanged?: boolean;
}

export const isISpreadsheetExistedValueView = (value: ISpreadsheetValueView): value is ISpreadsheetExistedValueView => {
    return (value as ISpreadsheetExistedValueView)?.id !== undefined;
}

export const isISpreadsheetNewValueView = (value: ISpreadsheetValueView): value is ISpreadsheetNewValueView => {
    return (value as ISpreadsheetNewValueView).isNew;
}

export type ISpreadsheetValueView = ISpreadsheetNewValueView | ISpreadsheetExistedValueView;

export interface ISpreadsheetExistedRowView {
    id: string;
    sheetId: string;
    values: ISpreadsheetValueView[];
    rowIndex: number
}

export interface ISpreadsheetNewRowView {
    sheetId: string;

    values: ISpreadsheetValueView[];
}

export type  ISpreadsheetRowView = ISpreadsheetExistedRowView | ISpreadsheetNewRowView

export interface ISpreadsheetView {
    createdAt: string;
    id: string;
    name: string;
    projectId: string;
    rows: ISpreadsheetRowView[]
}
