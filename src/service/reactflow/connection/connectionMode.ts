// eslint-disable-next-line import/named
import {EConnection, EConnectionMode, EConnectionSide} from "../../../interface";
import {Position} from "reactflow";

export const createHandleId = (connection: EConnection, side: EConnectionSide | Position, mode?: EConnectionMode) => {
    return `${connection}.${mode}.${side}`
}

export const parseConnectionHandleId = (handleId: string) => {
    const [connection, mode, side] = handleId.split('.')
    return {
        connection: connection as EConnection,
        mode: mode as EConnectionMode,
        side: side as EConnectionSide,
    }
}
