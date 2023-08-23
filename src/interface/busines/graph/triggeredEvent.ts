import {isObject} from "../../../utils";

export interface ITriggeredEvent {
    getTriggeredEvent: () => string | undefined
}

export const isITriggeredEvent = (obj: unknown): obj is ITriggeredEvent => {
    return isObject(obj) && 'getTriggeredEvent' in obj && typeof obj.getTriggeredEvent === 'function'
}
