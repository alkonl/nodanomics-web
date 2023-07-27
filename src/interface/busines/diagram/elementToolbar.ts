import {EElementType, IBaseDiagramElement} from "./diagramElement";
import {EElementShow} from "../../../component/DiagramEditor/toolbar";

export interface IDiagramElementPreviewToolbarElement extends IBaseDiagramElement {
    tooltip: string;
    toolbarName: string;
}

export type DiagramElementPreviewToolbar = {
    [key in EElementShow]: IDiagramElementPreviewToolbarElement[]
}
