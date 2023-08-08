import {MarkerType} from "reactflow";
import {EConnection} from "../../../interface";
import {EColor} from "../../../constant";

const dataConnection = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: EColor.green,
    },
}

const logicConnection = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: EColor.blue,
    },
}

const eventConnection = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: EColor.orange,
    }
}

export const connectionStyle: {
    [key in EConnection]: typeof dataConnection
} = {
    [EConnection.DataConnection]: dataConnection,
    [EConnection.LogicConnection]: logicConnection,
    [EConnection.EventConnection]: eventConnection
}
