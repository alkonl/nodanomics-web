import {MarkerType} from "reactflow";
import {EConnection} from "../../../interface";

const dataConnection = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#FF0072',
    },
}

const logicConnection = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#48ce22',
    },
}


export const connectionStyle: {
    [key in EConnection]: typeof dataConnection
} = {
    [EConnection.DataConnection]: dataConnection,
    [EConnection.LogicConnection]: logicConnection
}
