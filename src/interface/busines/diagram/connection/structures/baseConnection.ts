import {EElementType, IDiagramBaseInteractiveElementData} from "../../diagramElement";

export enum EConnection {
    DataConnection = 'DataConnection',
    LogicConnection = 'LogicConnection',
    EventConnection = 'EventConnection',
}

export interface IDiagramConnectionBaseData extends IDiagramBaseInteractiveElementData {
    sourceId: string;
    targetId: string;
    elementType: EElementType.Connection;
    type: EConnection;
}
