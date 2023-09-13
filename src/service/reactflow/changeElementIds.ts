import {IPastAndNewNode, IReactFlowEdge, IReactFlowNode} from "../../interface";
import {getNodesWithoutParent, recreateNode} from "./node";
import {generateEdgeId} from "./connection";
import {recursiveUpdateChildrenWithUpdatedParent} from "./logic";


export const changeElementIds = ({nodes, edges}: {
    nodes: IReactFlowNode[]
    edges: IReactFlowEdge[]
}): {
    nodes: IReactFlowNode[]
    edges: IReactFlowEdge[]
} => {
    const nodesWithoutParent = getNodesWithoutParent(nodes)
    const updatedNodesWithoutParent: IPastAndNewNode[] = nodesWithoutParent.map(node => {
        return {
            newNode: {
                ...recreateNode({node}),
                parentNode: undefined,
                extent: undefined,
            },
            previous: node
        }
    })
    const children: IPastAndNewNode[] = updatedNodesWithoutParent.map(({newNode, previous: previousTopParent}) => {
        return recursiveUpdateChildrenWithUpdatedParent({
            nodes,
            oldParentNode: previousTopParent,
            newParentNode: newNode,
            func: ({node, parentNode}) => {
                const updatedNode = recreateNode({node})
                const parent = previousTopParent.id === parentNode.id ? newNode : parentNode
                return {
                    ...updatedNode,
                    parentNode: parent.id,
                    data: {
                        ...updatedNode.data,
                        parentId: parent.id,
                    }
                }
            }
        })
    }).flat().map(({newParentNode, oldParentNode}) => {
        return {
            newNode: newParentNode,
            previous: oldParentNode
        }
    })
    const updatedNodes: IPastAndNewNode[] = [...updatedNodesWithoutParent, ...children]
    const edgesToPaste: IReactFlowEdge[] = edges.map(edge => {
        const edgeId = generateEdgeId()
        const sourceId = updatedNodes.find(node => node.previous.id === edge.source)?.newNode.id
        const targetId = updatedNodes.find(node => node.previous.id === edge.target)?.newNode.id
        return {
            ...edge,
            id: edgeId,
            data: {
                ...edge.data,
                id: edgeId,
                sourceId,
                targetId,
            },
            source: sourceId,
            target: targetId,
        }
    }) as IReactFlowEdge[]
    return {
        nodes: updatedNodes.map(({newNode}) => newNode),
        edges: edgesToPaste,
    }
}
