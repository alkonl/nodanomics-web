import {ELogic} from "./logic";
import {IDiagramNodeStyle} from "./elementStyle";
import {EDiagramNode} from "./node";
import {EConnection} from "./connection";

export enum EElementType {
    Node = 'Node',
    Connection = 'Connection',
    Event = 'Event',
    Logic = 'Logic',
}

export type IDiagramElement = EDiagramNode | EConnection | ELogic;

export interface IBaseDiagramElement {
    elementType: EElementType;
    type: IDiagramElement;
}


export interface IDiagramBaseInteractiveElementData extends IBaseDiagramElement{
    elementType: EElementType.Connection | EElementType.Node;
    type: EDiagramNode | EConnection
    id: string;
    name: string;
    label: string;
    style: IDiagramNodeStyle;
}
