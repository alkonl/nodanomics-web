export interface IGetDiagramSettingsRequest {
    diagramId?: string;
}

export interface IGetDiagramSettingsResponse {
    id: string;
    diagramId: string;
    DiagramLayers: {
        id: string;
        name: string;
        diagramEditorSettingsId: string;
    }[];
}
