import {EConnection, EElementType, IDiagramConnectionData} from "../../../interface";
// eslint-disable-next-line import/named
import {Connection, Edge} from "reactflow";
import {connectionStyle} from "./connectionStyle";
import {connectionInitialProps} from "./connectionInitialProps";

let id = 0;
const getEdgeId = () => `edgeId_${id++}`;


export const connectEdge = ({connection, type}:
                                {
                                    type: EConnection,
                                    connection: Connection
                                }): Connection & { data: IDiagramConnectionData } &
    Pick<Edge, 'type' | 'id' | 'markerEnd'> => {
    const edgeId = getEdgeId();
    return {
        ...connectionStyle[type],
        ...connection,
        type: type,
        id: edgeId,
        data: {
            ...connectionInitialProps[type],
            id: edgeId,
        }
    }
}
