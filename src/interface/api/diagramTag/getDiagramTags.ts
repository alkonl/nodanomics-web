
export interface IGetDiagramTagsRequest {
    dashboardViewId: string
}

export type IGetDiagramTagsResponse = {
    name: string
    id: string
}[]
