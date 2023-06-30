export interface IGetDiagramByIdResponse {
    id: string
    userId: string
    elements: JSON
    name: string
    description: string
    updatedAt: Date
    createdAt: Date
    diagramTags?: { id: string, name: string }[]
}
