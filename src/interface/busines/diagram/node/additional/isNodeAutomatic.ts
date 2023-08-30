import {isObject} from "../../../../../utils";

export interface IIsNodeAutomatic {
    isAutomatic: boolean
}

export const isNodeAutomatic = (node: unknown): node is IIsNodeAutomatic => {
    return isObject(node) && 'isAutomatic' in node && typeof node['isAutomatic'] === 'boolean'
}
