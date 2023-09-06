import {isObject} from "../../../utils";

export interface IResetBeforeStep {
    resetBeforeStep: () => void
}

export const isIResetBeforeStep = (obj: unknown): obj is IResetBeforeStep => {
    return isObject(obj) && 'resetBeforeStep' in obj && typeof obj.resetBeforeStep === 'function'
}
