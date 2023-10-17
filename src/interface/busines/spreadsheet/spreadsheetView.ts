export interface ISpreadsheetNewValueView {
    content: string;
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
    return (value as ISpreadsheetExistedValueView).id !== undefined;
}

export const isISpreadsheetNewValueView = (value: ISpreadsheetValueView): value is ISpreadsheetNewValueView => {
    return (value as ISpreadsheetNewValueView).content !== undefined;
}

export type ISpreadsheetValueView = ISpreadsheetNewValueView | ISpreadsheetExistedValueView;

export interface ISpreadsheetExistedRowView {
    id: string;
    sheetId: string;
    values: ISpreadsheetValueView[];
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
