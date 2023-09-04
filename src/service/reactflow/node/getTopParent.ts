import {IReactFlowNode} from "../../../interface";

export const getTopParent = (node: IReactFlowNode, candidates: IReactFlowNode[]) => {
    return candidates.reduce((prev, current) => {
        if (prev.id === current.parentNode) {
            return current
        }
        return prev
    }, candidates[0])
}

export const getTopParents = (nodes: IReactFlowNode[]): IReactFlowNode[] => {
    const nodesWithoutParent = nodes.filter(node => !nodes.some(n => n.id === node.parentNode))
    const nodesWithChildren = nodesWithoutParent.filter(node => nodes.some(n => n.parentNode === node.id))
    return nodesWithChildren.map(node => {
        return getTopParent(node, nodesWithChildren)
    })
}
