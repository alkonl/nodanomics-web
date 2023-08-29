import {IReactFlowNode} from "../../../interface";

export type IUpdateChildrenFunc = (params: {
    parentNode: IReactFlowNode,
    node: IReactFlowNode,
}) => IReactFlowNode

export const recursiveUpdateChildren = (nodes: IReactFlowNode[], parentNode: IReactFlowNode, func: IUpdateChildrenFunc): IReactFlowNode[] => {
    const childrenNodes = nodes.filter(node => node.data.parentId === parentNode.id)
    const updatedNodes: IReactFlowNode[] = childrenNodes.map(node => func({
        parentNode: parentNode,
        node: node,
    }))

    return updatedNodes.concat(...childrenNodes.map(node => recursiveUpdateChildren(nodes, node, func)))
}
