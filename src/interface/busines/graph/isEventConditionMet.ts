import {isObject} from "../../../utils";

export interface IIsEventConditionMet {
    isEventConditionMet: boolean
    eventName: string
}

export const isIIsEventConditionMet = (obj: unknown): obj is IIsEventConditionMet => {
    return isObject(obj) && 'isEventConditionMet' in obj && typeof obj.isEventConditionMet === 'boolean'
        && 'eventName' in obj && typeof obj.eventName === 'string'
}
