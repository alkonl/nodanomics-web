import {isObject} from "../../../utils";

export interface IUpdateStatePerNodeUpdate {
    updateStatePerNodeUpdate(): void;
}

export const isIUpdateStatePerNodeUpdate = (obj: unknown): obj is IUpdateStatePerNodeUpdate => {
    return isObject(obj)
        && 'updateStatePerNodeUpdate' in obj
        && typeof obj.updateStatePerNodeUpdate === 'function'
}
