import {IReactFlowNode} from "../../../interface";

export type IUpdateChildrenFunc = (params: {
    parentNode: IReactFlowNode,
    node: IReactFlowNode,
    index: number
}) => IReactFlowNode

export const recursiveUpdateChildren = (nodes: IReactFlowNode[], parentNode: IReactFlowNode, func: IUpdateChildrenFunc): IReactFlowNode[] => {
    const childrenNodes = nodes.filter(node => node.data.parentId === parentNode.id)
    const updatedNodes: IReactFlowNode[] = childrenNodes.map((node, index) => func({
        parentNode: parentNode,
        node: node,
        index,
    }))

    return updatedNodes.concat(...childrenNodes.map(node => recursiveUpdateChildren(nodes, node, func)))
}

export const recursiveUpdateChildrenV2 = (nodes: IReactFlowNode[], parentNode: IReactFlowNode, func: IUpdateChildrenFunc): IReactFlowNode[] => {
    const childrenNodes = nodes.filter(node => node.data.parentId === parentNode.id)
    const updatedNodes: IReactFlowNode[] = childrenNodes.map((node, index) => func({
        parentNode: parentNode,
        node: node,
        index,
    }))

    return updatedNodes.concat(...childrenNodes.map(node => recursiveUpdateChildren(nodes, node, func)))
}
