import {IReactFlowNode} from "../../../interface";
import {getTopParents} from "./getTopParent";

export const geAllChildrenNodes = ({nodes, parentId}: {
    parentId: string,
    nodes: IReactFlowNode[],
}): IReactFlowNode[] => {
    const childrenNodes = nodes.filter((node) => node.parentNode === parentId)
    const childrenNodesIds = childrenNodes.map((node) => node.id)
    const childrenChildrenNodes = childrenNodesIds.map((childrenNodeId) => {
        return geAllChildrenNodes({nodes, parentId: childrenNodeId})
    })
    return [
        ...childrenNodes,
        ...childrenChildrenNodes.flat(),
    ]
}



