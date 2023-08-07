import {EConnectionMode} from "../diagram";

export interface IIsEventTriggered {
    isEventTriggered: (mode?: EConnectionMode) => boolean
}

export const isIIsEventTriggered = (obj: any): obj is IIsEventTriggered => {
    return 'isEventTriggered' in obj && typeof obj.isEventTriggered === 'function'
}
