import {useCallback} from "react";
import {IReactFlowNode} from "../interface";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {findParent, IUpdateChildrenFunc, recursiveUpdateChildren} from "../service";

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
    return useCallback((node: IReactFlowNode, diagramNodes: IReactFlowNode[]) => {
        if (node.parentNode === undefined) {
            const parentNode = findParent(node, diagramNodes)
            if (parentNode && !parentNode.data.isCollapsed) {

                const parentPosition = parentNode.positionAbsolute || parentNode.position
                const childNode: IReactFlowNode = {
                    ...node,
                    data: {
                        ...node.data,
                        parentId: parentNode.id,
                        defaultZIndex: parentNode.zIndex ? parentNode.zIndex + 1 : 11,
                    },
                    parentNode: parentNode.id,
                    position: {
                        x: node.position.x - parentPosition.x,
                        y: node.position.y - parentPosition.y,
                    },
                    extent: 'parent',
                    zIndex: parentNode.zIndex ? parentNode.zIndex + 1 : 11,
                }


                const updatedInnerChildren = recursiveUpdateChildren(diagramNodes, childNode, updateLoopChildren)

                const nodesToUpdate = [childNode, ...updatedInnerChildren]
                dispatch(bulkUpdateNodes(nodesToUpdate))
            }
        }
        // const parentNode = findParent(node, nodes)
        // if (parentNode) {
        //     dispatch(updateNodeParent({
        //         node,
        //         parentNode
        //     }))
        // }
    }, [dispatch])
}
