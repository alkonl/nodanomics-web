export interface ICreateNewDiagramRequest {
    diagramName: string
    projectId: string
    elements?: JSON
}

export interface ICreateNewDiagramResponse {
    id: string
    // userId: string
    // elements: JSON
    // name: string
    // description: string
    // updatedAt: Date
    // createdAt: Date
}
