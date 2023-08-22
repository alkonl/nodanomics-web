import {EConnectionMode} from "../diagram";
import {isObject} from "../../../utils";

export interface IIsEventTriggered {
    isEventTriggered: (mode?: EConnectionMode) => boolean
}

export const isIIsEventTriggered = (obj: unknown): obj is IIsEventTriggered => {
    return isObject(obj) && 'isEventTriggered' in obj && typeof obj.isEventTriggered === 'function'
}
