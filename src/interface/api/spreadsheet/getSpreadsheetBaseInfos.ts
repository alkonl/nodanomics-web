export interface IGetSpreadsheetRequests {
    projectId?: string;
}

export interface IGetSpreadsheetResponse {
    data: {
        id: string;
        name: string;
        projectId: string;
        createdAt: string;
    }[]
}
