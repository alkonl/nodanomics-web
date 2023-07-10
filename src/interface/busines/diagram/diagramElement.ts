import React from "react";
import {EDiagramNode} from "./node";
export enum EElementType {
    Node = 'Node',
    Edge = 'Edge',
    Text = 'Text',
}

export interface IBaseElement {
    elementType: EElementType;
    type: EDiagramNode;
}

export interface DiagramElementPreview {
    type: 'Component';
    Component: React.FC;
};

export interface IDiagramElementPreviewTooltip extends IBaseElement {
    tooltip: string;
    preview: DiagramElementPreview
}
