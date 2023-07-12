import {EConnection, EElementType, IDiagramConnectionData} from "../../interface";
// eslint-disable-next-line import/named
import {Connection, Edge} from "reactflow";
import {initialNodeDiagramElement} from "../../constant";

let id = 0;
const getEdgeId = () => `edgeId_${id++}`;

export const connectEdge = (params: Connection): Connection & { data: IDiagramConnectionData } &
    Pick<Edge, 'type' | 'id'> => {
    const edgeId = getEdgeId();
    return {
        ...params,
        type: EConnection.DataConnection,
        id: edgeId,
        data: {
            elementType: EElementType.Connection,
            name: 'data connection',
            id: edgeId,
            type: EConnection.DataConnection,
            formula: '1+1',
            label: 'some label',
            style: initialNodeDiagramElement
        }
    }
}
