import {EElementType, IDiagramBaseInteractiveElementData} from "../../diagramElement";

export enum EConnection {
    DataConnection = 'DataConnection',
    LogicConnection = 'LogicConnection',
    ChainConnection = 'ChainConnection',
}

export enum EConnectionMode{
    LoopInnerToChildren = 'LoopInnerToChildren',
    LoopChildrenToExternal = 'LoopChildrenToExternal',
    NodeIncoming = 'NodeIncoming',
    NodeOutgoing = 'NodeOutgoing',
}


export interface IDiagramConnectionBaseData extends IDiagramBaseInteractiveElementData {
    sourceId: string;
    targetId: string;
    elementType: EElementType.Connection;
    sourceMode?: EConnectionMode
    targetMode?: EConnectionMode
    type: EConnection;
}
