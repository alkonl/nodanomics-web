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

export const recursiveUpdateChildrenV2 = (
    {
        newParentNode,
        oldParentNode,
        nodes,
        func,
    }: {
        nodes: IReactFlowNode[],
        newParentNode: IReactFlowNode,
        oldParentNode: IReactFlowNode,
        func: IUpdateChildrenFunc
    }): {
    newParentNode: IReactFlowNode,
    oldParentNode: IReactFlowNode,
}[] => {
    const childrenNodes = nodes.filter(node => node.data.parentId === oldParentNode.id)
    console.log(`parentNode ${newParentNode.data.name}: `, newParentNode, childrenNodes)
    const updatedNodes = childrenNodes.map((node, index) => {
        const updatedNode = func({
            parentNode: newParentNode,
            node: node,
            index,
        })
        console.log(`updatedNode ${updatedNode.data.name}: `, updatedNode)
        return {
            newParentNode: updatedNode,
            oldParentNode: node,
        }
    })

    const toUpdate = updatedNodes.map(({oldParentNode, newParentNode}) => recursiveUpdateChildrenV2({
        nodes,
        newParentNode: newParentNode,
        oldParentNode: oldParentNode,
        func,
    }))
    return updatedNodes.concat(...toUpdate)
}
