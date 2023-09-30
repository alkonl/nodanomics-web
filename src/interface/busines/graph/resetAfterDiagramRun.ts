import {isObject} from "../../../utils";

export interface IResetAfterDiagramRun {
    resetAfterDiagramRun: () => void
}

export const isIResetAfterDiagramRun = (obj: unknown): obj is IResetAfterDiagramRun => {
    return isObject(obj) && 'resetAfterDiagramRun' in obj && typeof obj.resetAfterDiagramRun === 'function'
}
