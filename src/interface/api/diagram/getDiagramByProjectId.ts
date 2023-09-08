export interface IGetDiagramByProjectIdRequest {
    projectId?: string
    cursorId?: string
}

export interface IGetDiagramByProjectIdResponse {
    id: string
    diagrams: {
        id: string
        name: string
        updatedAt: string
        createdAt: string
    }[]
}
