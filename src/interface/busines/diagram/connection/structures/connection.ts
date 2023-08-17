// eslint-disable-next-line import/named
import {Connection, Edge} from "reactflow";
import {IDataConnectionData} from "../dataConnection";
import {ILogicConnectionData} from "../logicConnection";
import {IChainConnectionData} from "../chainConnection";

export type IDiagramConnectionData = IDataConnectionData | ILogicConnectionData | IChainConnectionData;

export type IReactFlowEdge = Edge<IDiagramConnectionData>

export type IReactFlowEdgeConnection = Connection & {
    data: IDiagramConnectionData
}

export const isIReactFlowEdgeConnection = (connection: Connection): connection is IReactFlowEdgeConnection => {
    return 'data' in connection
}
