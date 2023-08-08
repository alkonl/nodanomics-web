import {INodeNumberVariable, isINodeNumberVariable} from "./variable";
import {isObject} from "../../../../../utils";

export type INodeLoopIncomingData = INodeNumberVariable

export const isINodeLoopIncomingData = (obj: unknown): obj is INodeLoopIncomingData => {
    return isObject(obj) && 'variables' in obj && isINodeNumberVariable(obj)
}
