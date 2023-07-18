import {EConnection} from "./connection";
import {EEvent} from "./event";
import {ELogic} from "./logic";
import {IDiagramNodeStyle} from "./elementStyle";
import {EDiagramNode} from "./node";

export enum EElementType {
    Node = 'Node',
    Connection = 'Connection',
    Event = 'Event',
    Logic = 'Logic',
}

export type IDiagramElement = EDiagramNode | EConnection | EEvent | ELogic;

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
