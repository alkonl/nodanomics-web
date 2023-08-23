import {MouseEvent} from "react";
import {IReactFlowNode, isINodeSize} from "../../../interface";
import {loopSize} from "../../../constant";

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
            size: { width: number, height: number }
        }) => void
    }) => {
    if (!node.parentNode) return
    const childrenNodes = diagramNodes.filter((diagramNode) => diagramNode.parentNode === node.parentNode)
    const parentNode = diagramNodes.find((diagramNode) => diagramNode.id === node.parentNode)

    if (parentNode && isINodeSize(parentNode.data.style) && node.width && node.height) {
        const parentSize = {
            width: parentNode.data.style.width,
            height: parentNode.data.style.height
        }
        const rightestChild = findRightestChild(childrenNodes, node)

        const mostBottomChild = findMostBottomChild(childrenNodes, node)

        let updatedWidth: number | undefined
        let updatedHeight: number | undefined

        const isRightestChild = rightestChild?.id === node.id
        const isMostBottomChild = mostBottomChild?.id === node.id

        const preCalculatedWidth = parentNode.data.style.width + event.movementX
        if (isRightestChild && preCalculatedWidth >= loopSize.minWidth && rightestChild.width) {
            const widthBetween = parentSize.width - rightestChild.position.x - rightestChild.width

            if (event.movementX < 0 && widthBetween > 20) {
                updatedWidth = preCalculatedWidth
            } else if (widthBetween < 40) {
                const additionalIncrease = widthBetween < 20 ? 10 : 0
                updatedWidth = preCalculatedWidth + additionalIncrease
            }

        }

        const preCalculatedHeight = parentNode.data.style.height + event.movementY
        if (isMostBottomChild && preCalculatedHeight >= loopSize.minHeight && mostBottomChild.height) {
            const heightBetween = parentSize.height - mostBottomChild.position.y - mostBottomChild.height
            if (event.movementY < 0 && heightBetween > 20) {
                updatedHeight = preCalculatedHeight
            } else if (heightBetween < 40) {
                const additionalIncrease = heightBetween < 20 ? 10 : 0
                updatedHeight = preCalculatedHeight + additionalIncrease
            }
        }

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
