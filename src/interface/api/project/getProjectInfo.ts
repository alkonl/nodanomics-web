export interface IGetProjectInfoRequest {
    projectId: string;
}

export interface IGetProjectInfoResponse {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    creator: {
        id: string;
        firstName: string;
        lastName: string;
    };
    lastEditor: {
        id: string;
        firstName: string;
        lastName: string;
    };
}
