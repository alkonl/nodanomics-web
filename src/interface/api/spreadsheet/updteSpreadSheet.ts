export interface IUpdateSpreadsheetRequests {
    id: string;
    rows: {
        id: string;
        sheetId: string;
        values: {
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
        }[];
    }[]
}


