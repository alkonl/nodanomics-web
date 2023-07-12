// eslint-disable-next-line import/named
import {Edge} from "reactflow";
import {IDiagramBaseInteractiveElementData} from "./diagramElement";

export enum EConnection {
    DataConnection = 'DataConnection',
    LogicConnection = 'LogicConnection',
    thirdType = 'thirdType',
}

export interface IDiagramConnectionBaseData extends IDiagramBaseInteractiveElementData{
    type: EConnection;
}


export interface IDataConnectionData extends IDiagramConnectionBaseData {
    type: EConnection.DataConnection;
    formula?: string
}

export interface ILogicConnectionData extends IDiagramConnectionBaseData {
    type: EConnection.LogicConnection;
}

export type IDiagramConnectionData = IDataConnectionData | ILogicConnectionData;

export type IReactFlowEdge = Edge<IDiagramConnectionData>;
