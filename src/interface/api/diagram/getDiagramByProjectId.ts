export interface IGetDiagramByProjectIdRequest {
    projectId?: string
    cursorId?: string
}

export interface IGetDiagramByProjectIdResponse {
    diagrams: {
        id: string
        name: string
        updatedAt: string
        createdAt: string
    }[]
}
