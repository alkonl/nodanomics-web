import {isObject} from "../../../../../utils";

export interface IIsShowInExecutionGraphNode {
    isShowInExecutionGraphNode: boolean;
}

export const isShowInExecutionGraphNode = (node: unknown): node is IIsShowInExecutionGraphNode  => {
    return isObject(node) && 'isShowInExecutionGraphNode' in node
        && typeof node.isShowInExecutionGraphNode === 'boolean';
}
