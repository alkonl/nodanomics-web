import {MouseEvent} from "react";
import {ILoopNodeData, IReactFlowNode, isILoopNodeData} from "../../../interface";

export const findRightestChild = (childrenNodes: IReactFlowNode[], node: IReactFlowNode) => {
    return childrenNodes.reduce((prev, current) => {
        if (prev.width !== null && current.width !== null && prev.width && current.width) {
            return (prev.position.x + prev.width > current.position.x + current.width) ? prev : current
        }
        return current
    }, node)
}

export const findMostBottomChild = (childrenNodes: IReactFlowNode[], node: IReactFlowNode) => {
    return childrenNodes.reduce((prev, current) => {
        const prevBottom = prev.position.y + (typeof prev.height === 'number' ? prev.height : 0)
        const currentBottom = current.position.y + (typeof current.height === 'number' ? current.height : 0)
        return prevBottom > currentBottom ? prev : current
    }, node)
}


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
    if (!node.parentNode) return
    const childrenNodes = diagramNodes.filter((diagramNode) => diagramNode.parentNode === node.parentNode)
    const parentNode = diagramNodes.find((diagramNode) => diagramNode.id === node.parentNode)

    if (parentNode && isILoopNodeData(parentNode.data) && node.width && node.height) {
        const parentSize = {
            width: parentNode.data.style.width,
            height: parentNode.data.style.height
        }
        const rightestChild = findRightestChild(childrenNodes, node)

        const mostBottomChild = findMostBottomChild(childrenNodes, node)

        const isRightestChild = rightestChild?.id === node.id
        const isMostBottomChild = mostBottomChild?.id === node.id

        const updatedWidth = isRightestChild
            ? calcWidth({child: rightestChild, offsetX: event.movementX, parentNode: parentNode.data})
            : parentNode.data.style.width

        const updatedHeight = isMostBottomChild
            ? calcHeight({child: mostBottomChild, offsetY: event.movementY, parentNode: parentNode.data})
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
