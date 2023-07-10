export interface IGetProjectsRequest {
    cursorId?: string;
}

export type IGetProjectsResponse = {
    id: string;
    name: string;
    updatedAt: string;
    createdAt: string;
    creator: {
        firstName: string;
        lastName: string;
        id: string;
    }
    lastEditor: {
        firstName: string;
        lastName: string;
        id: string;
    }
}[]
