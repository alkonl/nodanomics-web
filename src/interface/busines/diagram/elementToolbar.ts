import {EElementType, IBaseDiagramElement} from "./diagramElement";

export interface IDiagramElementPreviewToolbarElement extends IBaseDiagramElement {
    tooltip: string;
    toolbarName: string;
}

export type DiagramElementPreviewToolbar = {
    [key in EElementType]: IDiagramElementPreviewToolbarElement[]
}
