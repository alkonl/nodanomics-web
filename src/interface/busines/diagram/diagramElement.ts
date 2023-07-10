import React from "react";
import {EDiagramNode} from "./node";
import {EConnection} from "./connection";
import {EEvent} from "./event";
import {ELogic} from "./logic";

export enum EElementType {
    Node = 'Node',
    Connection = 'Connection',
    Event = 'Event',
    Logic = 'Logic',
}

export type IDiagramElement = EDiagramNode | EConnection | EEvent | ELogic;

export interface IBaseElement {
    elementType: EElementType;
    type: IDiagramElement;
}

export interface DiagramElementPreview {
    type: 'Component';
    Component: React.FC;
};

export interface IDiagramElementPreviewToolbarElement extends IBaseElement {
    tooltip: string;
    toolbarName: string;
    // preview: DiagramElementPreview
}

export type DiagramElementPreviewToolbar = {
    [key in EElementType]: IDiagramElementPreviewToolbarElement[]
}
