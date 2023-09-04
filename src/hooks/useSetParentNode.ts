import {useCallback} from "react";
import {IReactFlowNode} from "../interface";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {findParent, IUpdateChildrenFunc, recursiveUpdateChildren} from "../service";
import {isNodeCanBeParent} from "../interface/busines/diagram/canBeParent";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";

const updateLoopChildren: IUpdateChildrenFunc = ({parentNode, node}) => {
    return {
        ...node,
        zIndex: parentNode.zIndex ? parentNode.zIndex + 1 : 12,
        data: {
            ...node.data,
            defaultZIndex: parentNode.data.defaultZIndex ? parentNode.data.defaultZIndex + 1 : 12,
        }
    }
}

export const useSetParentNode = () => {
    const dispatch = useAppDispatch()
    const {bulkUpdateNodes} = diagramEditorActions

    const offHistoryExecuted = useOffHistoryExecuted()
    return useCallback((node: IReactFlowNode, diagramNodes: IReactFlowNode[]) => {
        if (node.parentNode === undefined) {
            const parentNode = findParent(node, diagramNodes)
            if (parentNode && !parentNode.data.isCollapsed) {

                const parentPosition = parentNode.positionAbsolute || parentNode.position
                const isCanBeParent = isNodeCanBeParent(node.data.type)
                const zIndex = isCanBeParent
                    ? parentNode.zIndex ? parentNode.zIndex + 15 : 15
                    : parentNode.zIndex ? parentNode.zIndex + 11 : 11
                const childNode: IReactFlowNode = {
                    ...node,
                    data: {
                        ...node.data,
                        parentId: parentNode.id,
                        defaultZIndex: zIndex,
                    },
                    parentNode: parentNode.id,
                    position: {
                        x: node.position.x - parentPosition.x,
                        y: node.position.y - parentPosition.y,
                    },
                    extent: 'parent',
                    zIndex: zIndex
                }


                const updatedInnerChildren = recursiveUpdateChildren(diagramNodes, childNode, updateLoopChildren)

                const nodesToUpdate = [childNode, ...updatedInnerChildren]
                offHistoryExecuted('setParentNode')
                dispatch(bulkUpdateNodes(nodesToUpdate))

            }
        }
    }, [dispatch])
}
