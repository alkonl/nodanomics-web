// eslint-disable-next-line import/named
import {Connection, Edge} from "reactflow";
import {EElementType, IDiagramBaseInteractiveElementData} from "./diagramElement";

export enum EConnection {
    DataConnection = 'DataConnection',
    LogicConnection = 'LogicConnection',
}

export interface IDiagramConnectionBaseData extends IDiagramBaseInteractiveElementData {
    sourceId: string;
    targetId: string;
    elementType: EElementType.Connection;
    type: EConnection;
}


export interface IDataConnectionData extends IDiagramConnectionBaseData {
    type: EConnection.DataConnection;
    interval?: number;
    formula?: string
}

export interface ILogicConnectionData extends IDiagramConnectionBaseData {
    type: EConnection.LogicConnection;
    variableName?: string;
}

export type IDiagramConnectionData = IDataConnectionData | ILogicConnectionData;

export type IReactFlowEdge = Edge<IDiagramConnectionData>;

export type IReactFlowEdgeConnection = Connection & {
    data: IDiagramConnectionData
}

export const isIReactFlowEdgeConnection = (connection: Connection): connection is IReactFlowEdgeConnection => {
    return 'data' in connection
}
