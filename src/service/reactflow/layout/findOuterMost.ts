import {IReactFlowNode} from "../../../interface";

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


export const findMostBottomAndRightestChild = (childrenNodes: IReactFlowNode[], node: IReactFlowNode) => {
    const rightestChild = findRightestChild(childrenNodes, node)
    const mostBottomChild = findMostBottomChild(childrenNodes, node)
    return {
        rightestChild,
        mostBottomChild
    }
}

export const isMostBottomOrRightestChild = (childrenNodes: IReactFlowNode[], node: IReactFlowNode) => {
    const {rightestChild, mostBottomChild} = findMostBottomAndRightestChild(childrenNodes, node)
    return {
        isRightestChild: rightestChild?.id === node.id,
        isMostBottomChild: mostBottomChild?.id === node.id
    }
}
