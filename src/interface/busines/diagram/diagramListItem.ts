export interface IBaseDiagramInfo {
    id: string;
    name: string;
    updatedAt: string;
    createdAt: string;
    creator: {
        firstName: string;
        lastName: string;
        id: string;
    };
    lastEditor: {
        firstName: string;
        lastName: string;
        id: string;
    };
}
