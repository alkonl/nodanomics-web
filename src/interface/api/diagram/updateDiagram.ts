export interface IUpdateDiagramRequest {
    diagramId?: string
    diagramName?: string
    diagramDescription?: string
    diagramTags?: { id?: string, name: string }[]
    elements?: JSON
}

export interface IUpdateDiagramResponse {
    id: string
    userId: string
    elements: JSON
    name: string
    description: string
    updatedAt: Date
    createdAt: Date
}
