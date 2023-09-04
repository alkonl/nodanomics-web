// eslint-disable-next-line import/named
import {ReactFlowInstance} from "reactflow";
import {ICopiedElements, IPastAndNewNode, IReactFlowEdge, IReactFlowNode, MousePosition} from "../../../interface";
import {getTopParents} from "./getTopParent";
import {recursiveUpdateChildrenWithUpdatedParent} from "../logic";
import {recreateNode} from "./recreateNode";
import {generateEdgeId} from "../connection/generateEdgeId";
import {getNodesWithoutParent} from "./getNodesWithoutParent";

export const prepareCopiedNodesToPaste = ({elements, reactFlowInstance, reactFlowWrapper, mousePosition}: {
    reactFlowInstance: ReactFlowInstance
    reactFlowWrapper: HTMLDivElement
    mousePosition: MousePosition
    elements: ICopiedElements
}): ICopiedElements => {
    const reactFlowBounds = reactFlowWrapper.getBoundingClientRect();
    const position = reactFlowInstance.project({
        x: mousePosition.x - reactFlowBounds.left,
        y: mousePosition.y - reactFlowBounds.top,
    });
    const {nodes, edges} = elements
    // const topNodes = getTopParents(nodes)

    const nodesWithoutParent = getNodesWithoutParent(nodes)

    const theLeftestNode = nodesWithoutParent.reduce((prev, current) => {
        if (prev.position.x > current.position.x) {
            return current
        }
        return prev
    }, nodesWithoutParent[0])
    const theLeftestNodePosition = {
        x: theLeftestNode.position.x || Number(theLeftestNode.positionAbsolute?.x),
        y: theLeftestNode.position.y || Number(theLeftestNode.positionAbsolute?.y),
    }
    const updatedNodesWithoutParent: IPastAndNewNode[] = nodesWithoutParent.map(node => {
        const currentNodePosition = {
            x: node.position.x || Number(node.positionAbsolute?.x),
            y: node.position.y || Number(node.positionAbsolute?.y),
        }
        const nodeDifferenceX = currentNodePosition.x - theLeftestNodePosition.x
        const nodeDifferenceY = currentNodePosition.y - theLeftestNodePosition.y
        const nodePosition = {
            x: position.x + nodeDifferenceX,
            y: position.y + nodeDifferenceY,
        }
        console.log('nodePosition', nodePosition)
        return {
            newNode: {
                ...recreateNode({node, position: nodePosition}),
                parentNode: undefined,
                extent: undefined,
            },
            previous: node
        }
    })




    // const formatedParents: IPastAndNewNode[] = nodesWithoutParent.map(node => {
    //     return {
    //         newNode: {
    //
    //         },
    //         previous: node,
    //
    //     }
    // })


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

    const updatedNodesWithUpdatedEdges: IReactFlowNode[] = updatedNodes.map(({newNode}) => {
        return newNode
    })
    return {
        nodes: updatedNodesWithUpdatedEdges,
        edges: edgesToPaste,
    }
}
