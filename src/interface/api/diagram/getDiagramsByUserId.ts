export interface IGetDiagramsByUserIdResponse {
    diagrams: {
        id: string;
        name: string;
        description: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]
}
