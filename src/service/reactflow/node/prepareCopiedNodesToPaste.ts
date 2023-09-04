// eslint-disable-next-line import/named
import {ReactFlowInstance} from "reactflow";
import {ICopiedElements, IPastAndNewNode, IReactFlowEdge, IReactFlowNode, MousePosition} from "../../../interface";
import {getTopParents} from "./getTopParent";
import {recursiveUpdateChildrenWithUpdatedParent} from "../logic";
import {recreateNode} from "./recreateNode";
import {generateEdgeId} from "../connection/generateEdgeId";

export const prepareCopiedNodesToPaste = ({elements, reactFlowInstance, reactFlowWrapper, mousePosition}: {
    reactFlowInstance: ReactFlowInstance
    reactFlowWrapper: HTMLDivElement
    mousePosition: MousePosition
    elements: ICopiedElements
}): ICopiedElements => {
    const {nodes, edges} = elements
    const topNodes = getTopParents(nodes)

    const nodesWithoutParent = nodes
        .filter(node => !nodes.some(n => n.id === node.parentNode) && !topNodes.some(n => n.id === node.id))
    const reactFlowBounds = reactFlowWrapper.getBoundingClientRect();
    const position = reactFlowInstance.project({
        x: mousePosition.x - reactFlowBounds.left,
        y: mousePosition.y - reactFlowBounds.top,
    });


    const updatedTopParents: IPastAndNewNode[] = topNodes.map(node => {
        return {
            newNode: {
                ...recreateNode({node, position}),
                parentNode: undefined,
                extent: undefined,
            },
            previous: node,

        }
    })


    const children: IPastAndNewNode[] = updatedTopParents.map(({newNode, previous: previousTopParent}) => {
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
                        name: `${updatedNode.data.name}`,
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

    const updatedNodesWithoutParent: IPastAndNewNode[] = nodesWithoutParent.map(node => {
        return {
            newNode: {
                ...recreateNode({node, position}),
                parentNode: undefined,
                extent: undefined,
            },
            previous: node
        }
    })

    const updatedNodes: IPastAndNewNode[] = [...updatedNodesWithoutParent, ...updatedTopParents, ...children]


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

    const updatedNodesWithUpdatedEdges: IReactFlowNode[] = updatedNodes.map(({newNode}) => {
        return newNode
    })
    return {
        nodes: updatedNodesWithUpdatedEdges,
        edges: edgesToPaste,
    }
}
