import {isObject} from "../../../utils";

export interface IIsExecuteOutgoingNodes {
    isExecuteOutgoingNodes: boolean
}

export const isIIsExecuteOutgoingNodes = (obj: unknown): obj is IIsExecuteOutgoingNodes => {
    return isObject(obj) && 'isExecuteOutgoingNodes' in obj && typeof obj['isExecuteOutgoingNodes'] === 'boolean'
}
