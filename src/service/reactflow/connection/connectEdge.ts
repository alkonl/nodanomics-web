import {EConnection, EElementType, IDiagramConnectionData} from "../../../interface";
// eslint-disable-next-line import/named
import {Connection, Edge} from "reactflow";
import {connectionStyle} from "./connectionStyle";
import {connectionInitialProps} from "./connectionInitialProps";
import {nanoid} from "nanoid";

const getEdgeId = () => `edgeId_${nanoid()}`;

export const defineConnectionTypeBySourceAndTarget = ({source, target}: {
    source: string,
    target: string
}): EConnection => {
    if (target === EConnection.LogicConnection) {
        return EConnection.LogicConnection
    }
    return EConnection.DataConnection
}


export const connectEdge = ({connection}:
                                {
                                    connection: Connection
                                }): Connection & { data: IDiagramConnectionData } &
    Pick<Edge, 'type' | 'id' | 'markerEnd'> => {

    if (connection.sourceHandle === null || connection.targetHandle === null) {
        throw new Error('sourceHandle and targetHandle null')
    }
    if (connection.source === null || connection.target === null) {
        throw new Error('source and target null')
    }

    const type = defineConnectionTypeBySourceAndTarget({
        source: connection.sourceHandle,
        target: connection.targetHandle
    });

    const edgeId = getEdgeId();
    return {
        ...connectionStyle[type],
        ...connection,
        type: type,
        id: edgeId,
        data: {
            ...connectionInitialProps[type],
            sourceId: connection.source,
            targetId: connection.target,
            id: edgeId,
        }
    }
}
