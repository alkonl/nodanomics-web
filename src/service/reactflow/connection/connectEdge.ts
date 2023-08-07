import {EConnection, EConnectionMode, IDiagramConnectionData} from "../../../interface";
// eslint-disable-next-line import/named
import {Connection, Edge} from "reactflow";
import {connectionStyle} from "./connectionStyle";
import {connectionInitialProps} from "./connectionInitialProps";
import {nanoid} from "nanoid";
import {EDGE_Z_INDEX} from "../../../constant";
import {parseConnectionHandleId} from "./connectionMode";

const getEdgeId = () => `edgeId_${nanoid()}`;

export const defineConnectionTypeBySourceAndTarget = ({targetHandle, sourceHandle}: {
    sourceHandle: string,
    targetHandle: string
}): EConnection => {
    console.log('defineConnectionTypeBySourceAndTarget', targetHandle, sourceHandle)
    const targetType = targetHandle.split('.')[0];
    const sourceType = sourceHandle.split('.')[0];
    if (targetType === EConnection.LogicConnection) {
        return EConnection.LogicConnection
    } else if (targetType === EConnection.EventConnection || sourceType === EConnection.EventConnection) {
        return EConnection.EventConnection
    }
    return EConnection.DataConnection
}

export const defineConnectionModeBySourceHandle = ({sourceHandle}: {
    sourceHandle: string,
}): EConnectionMode | undefined => {
    console.log('defineConnectionModeBySourceHandle', sourceHandle)
    const mode = sourceHandle.split('.')[1];
    if (mode && Object.values(EConnectionMode).includes(mode as EConnectionMode)) {
        return mode as EConnectionMode
    }
    return undefined
}


export const connectEdge = ({connection}:
                                {
                                    connection: Connection
                                }): Connection & { data: IDiagramConnectionData } &
    Pick<Edge, 'type' | 'id' | 'markerEnd' | 'zIndex'> => {
    console.log('connectEdge.connection', connection)
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
    console.log('targetMode', targetMode)

    const edgeId = getEdgeId();
    return {
        ...connectionStyle[type],
        ...connection,
        zIndex: EDGE_Z_INDEX,
        type: type,
        id: edgeId,
        data: {
            ...connectionInitialProps[type],
            sourceId: connection.source,
            targetId: connection.target,
            id: edgeId,
            sourceMode: sourceMode,
            targetMode: targetMode,
        }
    }
}
