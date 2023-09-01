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
    const topParents = nodes.filter(node => !nodes.some(n => n.id === node.parentNode))
    return topParents.map(node => {
        return getTopParent(node, topParents)
    })
}
