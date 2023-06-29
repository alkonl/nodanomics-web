export interface ICreateNewDiagramRequest {
    diagramName: string
    diagramDescription: string
    diagramTags: { id?: string, name: string }[]
    elements?: JSON
}

export interface ICreateNewDiagramResponse {
    id: string
    userId: string
    elements: JSON
    name: string
    description: string
    updatedAt: Date
    createdAt: Date
}
