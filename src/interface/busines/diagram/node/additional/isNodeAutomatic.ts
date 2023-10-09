import {isObject} from "../../../../../utils";
import {IDiagramNodeBaseData} from "../structures";

export interface IIsNodeAutomatic {
    isAutomatic: boolean
}

export const isNodeAutomatic = (node: unknown): node is ( IDiagramNodeBaseData & IIsNodeAutomatic) => {
    return isObject(node) && 'isAutomatic' in node && typeof node['isAutomatic'] === 'boolean'
}
