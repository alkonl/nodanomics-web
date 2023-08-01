import {EElementType, IDiagramBaseInteractiveElementData} from "../../diagramElement";

export enum EConnection {
    DataConnection = 'DataConnection',
    LogicConnection = 'LogicConnection',
    EventConnection = 'EventConnection',
}

export enum EConnectionMode{
    LoopOut = 'LoopOut',
    LoopIn = 'LoopIn',
}


export interface IDiagramConnectionBaseData extends IDiagramBaseInteractiveElementData {
    sourceId: string;
    targetId: string;
    elementType: EElementType.Connection;
    mode?: EConnectionMode
    type: EConnection;
}
