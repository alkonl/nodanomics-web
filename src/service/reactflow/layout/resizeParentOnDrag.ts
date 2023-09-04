import {MouseEvent} from "react";
import {ILoopNodeData, IReactFlowNode, isILoopNodeData} from "../../../interface";
import {isMostBottomOrRightestChild} from "./findOuterMost";


export const calcWidth = ({child, offsetX, parentNode}: {
    parentNode: ILoopNodeData,
    child: IReactFlowNode,
    offsetX: number,
}): number | undefined => {
    const parentWidth = parentNode.style.width
    if (typeof child.width !== 'number') return undefined
    const preCalculatedWidth = parentWidth + offsetX
    const widthBetween = parentWidth - child.position.x - child.width

    if (offsetX < 0 && widthBetween > 20) {
        return preCalculatedWidth
    } else if (widthBetween < 40) {
        const additionalIncrease = widthBetween < 20 ? 10 : 0
        return preCalculatedWidth + additionalIncrease
    }
}

export const calcHeight = ({child, offsetY, parentNode}: {
    parentNode: ILoopNodeData,
    child: IReactFlowNode,
    offsetY: number,
}): number | undefined => {
    const parentHeight = parentNode.style.height
    if (typeof child.height !== 'number') return undefined
    const preCalculatedHeight = parentHeight + offsetY
    const heightBetween = parentHeight - child.position.y - child.height

    if (offsetY < 0 && heightBetween > 20) {
        return preCalculatedHeight
    } else if (heightBetween < 40) {
        const additionalIncrease = heightBetween < 20 ? 10 : 0
        return preCalculatedHeight + additionalIncrease
    }
}

export const resizeParent = (
    {
        diagramNodes,
        updateNodeSize,
        node,
        addWidth,
        addHeight
    }: {
        node: IReactFlowNode,
        diagramNodes: IReactFlowNode[]
        addWidth: number,
        addHeight: number,
        updateNodeSize: (params: {
            nodeId: string,
            size: {
                width: number,
                height: number
            }
        }) => void
    }) => {
    if (!node.parentNode) return
    const childrenNodes = diagramNodes.filter((diagramNode) => diagramNode.parentNode === node.parentNode)
    const parentNode = diagramNodes.find((diagramNode) => diagramNode.id === node.parentNode)

    if (parentNode && isILoopNodeData(parentNode.data) && node.width && node.height) {

        const {isRightestChild, isMostBottomChild} = isMostBottomOrRightestChild(childrenNodes, node)

        const updatedWidth = isRightestChild
            ? calcWidth({child: node, offsetX: addWidth, parentNode: parentNode.data})
            : parentNode.data.style.width

        const updatedHeight = isMostBottomChild
            ? calcHeight({child: node, offsetY: addHeight, parentNode: parentNode.data})
            : parentNode.data.style.height

        if (isRightestChild || isMostBottomChild) {

            updateNodeSize({
                nodeId: parentNode.id,
                size: {
                    width: updatedWidth || parentNode.data.style.width,
                    height: updatedHeight || parentNode.data.style.height
                }
            })
        }
    }
}

export const resizeParentOnDrag = (
    {
        diagramNodes,
        updateNodeSize,
        node,
        event
    }: {
        event: MouseEvent,
        node: IReactFlowNode,
        diagramNodes: IReactFlowNode[]
        updateNodeSize: (params: {
            nodeId: string,
            size: {
                width: number,
                height: number
            }
        }) => void
    }) => {

    const updateX = event.movementX + 20
    const updateY = event.movementY + 20

    resizeParent({
        node,
        diagramNodes,
        updateNodeSize,
        addWidth: updateX,
        addHeight: updateY
    })
}
