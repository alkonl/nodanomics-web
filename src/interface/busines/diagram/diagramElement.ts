import React from "react";
import {IBaseDiagramNode} from "./node";
export enum EElementType {
    Node = 'Node',
    Edge = 'Edge',
    Text = 'Text',
}

export interface DiagramElementPreview {
    type: 'Component';
    Component: React.FC;
};

export interface IDiagramElementPreviewTooltip extends IBaseDiagramNode {
    tooltip: string;
    preview: DiagramElementPreview
}
