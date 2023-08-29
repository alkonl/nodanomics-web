export interface IGetExecutionGraphPropertiesRequest {
    diagramId?: string;
}

export interface IGetExecutionGraphPropertiesResponse {
    diagramId: string;
    gridColor?: string;
    xAxisTitle?: string;
}
