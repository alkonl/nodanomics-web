import {EElementType, IDiagramBaseInteractiveElementData} from "../../diagramElement";

export enum EConnection {
    DataConnection = 'DataConnection',
    LogicConnection = 'LogicConnection',
    EventConnection = 'EventConnection',
}

export enum EConnectionMode{
    LoopInToChildren = 'LoopInToChildren',
    WhileLoopIsTriggered = 'WhileLoopIsTriggered',
    NodeIn = 'NodeIn',
    NodeOut = 'NodeOut',
}


export interface IDiagramConnectionBaseData extends IDiagramBaseInteractiveElementData {
    sourceId: string;
    targetId: string;
    elementType: EElementType.Connection;
    sourceMode?: EConnectionMode
    targetMode?: EConnectionMode
    type: EConnection;
}
