import {EConnection, EElementType, IDiagramConnectionData} from "../../interface";
// eslint-disable-next-line import/named
import {Connection, Edge, MarkerType} from "reactflow";
import {initialNodeDiagramElement} from "../../constant";

let id = 0;
const getEdgeId = () => `edgeId_${id++}`;

export const connectEdge = (params: Connection): Connection & { data: IDiagramConnectionData } &
    Pick<Edge, 'type' | 'id' | 'markerEnd'> => {
    const edgeId = getEdgeId();
    return {
        ...params,
        type: EConnection.DataConnection,
        id: edgeId,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#FF0072',
        },
        data: {
            elementType: EElementType.Connection,
            name: 'data connection',
            id: edgeId,
            type: EConnection.DataConnection,
            formula: '1',
            label: 'some label',
            style: initialNodeDiagramElement
        }
    }
}
