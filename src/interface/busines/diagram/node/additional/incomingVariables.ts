import {INumberVariable} from "./variable";
import {isObject} from "../../../../../utils";

export interface INodeIncomingVariables {
    incomingVariables: INumberVariable[]
}

export const isINodeIncomingVariables = (obj: unknown): obj is INodeIncomingVariables => {
    return isObject(obj) && 'incomingVariables' in obj && Array.isArray(obj.incomingVariables)
}
