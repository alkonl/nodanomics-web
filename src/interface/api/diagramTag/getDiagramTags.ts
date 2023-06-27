
export interface IGetDiagramTagsRequest {
    diagramsShowPageId: string
}

export type IGetDiagramTagsResponse = {
    name: string
    id: string
}[]
