import {isObject} from "../../../../utils";

export interface IIsElementExecuted {
    isExecuted: boolean;
}

export const isIIsElementExecuted = (obj: unknown): obj is IIsElementExecuted => {
    return isObject(obj) && 'isExecuted' in obj && typeof obj.isExecuted === 'boolean'
}
