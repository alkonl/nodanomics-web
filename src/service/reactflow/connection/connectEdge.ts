import {EConnection, EConnectionMode, IDiagramConnectionData} from "../../../interface";
// eslint-disable-next-line import/named
import {Connection, Edge} from "reactflow";
import {connectionStyle} from "./connectionStyle";
import {connectionInitialProps} from "./connectionInitialProps";
import {EDGE_Z_INDEX} from "../../../constant";
import {parseConnectionHandleId} from "./connectionMode";
import {generateEdgeId} from "./generateEdgeId";


export const defineConnectionTypeBySourceAndTarget = ({targetHandle, sourceHandle}: {
    sourceHandle: string,
    targetHandle: string
}): EConnection => {
    const targetType = targetHandle.split('.')[0];
    const sourceType = sourceHandle.split('.')[0];
    if (targetType === EConnection.LogicConnection) {
        return EConnection.LogicConnection
    } else if (targetType === EConnection.ChainConnection || sourceType === EConnection.ChainConnection) {
        return EConnection.ChainConnection
    }
    return EConnection.DataConnection
}

export const defineConnectionModeBySourceHandle = ({sourceHandle}: {
    sourceHandle: string,
}): EConnectionMode | undefined => {
    const mode = sourceHandle.split('.')[1];
    if (mode && Object.values(EConnectionMode).includes(mode as EConnectionMode)) {
        return mode as EConnectionMode
    }
    return undefined
}


export const connectEdge = ({connection}:
                                {
                                    connection: Connection
                                }): Connection & {
    data: IDiagramConnectionData
} &
    Pick<Edge, 'type' | 'id' | 'markerEnd' | 'zIndex'> => {
    if (connection.sourceHandle === null || connection.targetHandle === null) {
        throw new Error('sourceHandle and targetHandle null')
    }
    if (connection.source === null || connection.target === null) {
        throw new Error('source and target null')
    }

    const type = defineConnectionTypeBySourceAndTarget({
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle
    });

    const sourceMode = parseConnectionHandleId(connection.sourceHandle).mode;
    const targetMode = parseConnectionHandleId(connection.targetHandle).mode;
    const sourceSide = parseConnectionHandleId(connection.sourceHandle).side;
    const targetSide = parseConnectionHandleId(connection.targetHandle).side;

    const edgeId = generateEdgeId();
    const baseData = {
        sourceId: connection.source,
        targetId: connection.target,
        id: edgeId,
        sourceMode: sourceMode,
        targetMode: targetMode,
    }
    const data: IDiagramConnectionData = {
        ...connectionInitialProps[type],
        ...baseData,
        sourceSide,
        targetSide,
    } as IDiagramConnectionData;

    return {
        ...connectionStyle[type],
        ...connection,
        zIndex: EDGE_Z_INDEX,
        type: type,
        id: edgeId,
        data: data,
    }
}
