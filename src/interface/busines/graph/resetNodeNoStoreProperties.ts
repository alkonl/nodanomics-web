import {isObject} from "../../../utils";

export interface IResetNodeNoStoreProperties {
    resetNodeNoStoreProperties(): void
}

export const isIResetNodeNoStoreProperties = (obj: unknown): obj is IResetNodeNoStoreProperties => {
    return isObject(obj) && 'resetNodeNoStoreProperties' in obj && typeof obj.resetNodeNoStoreProperties === 'function'
}
