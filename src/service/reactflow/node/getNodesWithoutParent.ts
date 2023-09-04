import {IReactFlowNode} from "../../../interface";

export const getNodesWithoutParent = (nodes: IReactFlowNode[]): IReactFlowNode[] => {
    return nodes.filter(node => !nodes.some(n => n.id === node.parentNode))
}
