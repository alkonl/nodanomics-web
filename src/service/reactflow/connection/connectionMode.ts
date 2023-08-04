// eslint-disable-next-line import/named
import {HandleType} from "reactflow";
import {EConnection, EConnectionMode} from "../../../interface";

export const createHandleId = (connection: EConnection, mode: EConnectionMode, type: HandleType) => {
    return `${connection}.${mode}.${type}`
}

export const parseConnectionHandleId = (handleId: string) => {
    const [connection, mode, type] = handleId.split('.')
    return {
        connection: connection as EConnection,
        mode: mode as EConnectionMode,
        type: type as HandleType
    }
}
