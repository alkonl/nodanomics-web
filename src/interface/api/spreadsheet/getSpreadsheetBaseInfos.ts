export interface IGetSpreadsheetsBaseInfoRequests {
    projectId?: string;
}

export interface IGetSpreadsheetBaseInfoResponse {
    data: {
        id: string;
        name: string;
        projectId: string;
        createdAt: string;
    }[]
}
