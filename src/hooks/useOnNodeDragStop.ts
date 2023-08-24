// eslint-disable-next-line import/named
import {IReactFlowNode} from "../interface";
import {MouseEvent as ReactMouseEvent} from "react";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {findParent, IUpdateChildrenFunc, recursiveUpdateChildren} from "../service";


export const useOnNodeDragStop = () => {
    const {diagramNodes} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    const {bulkUpdateNodes, updateNodeParent} = diagramEditorActions
    return (event: ReactMouseEvent, node: IReactFlowNode) => {
        if (node.parentNode === undefined) {
            const parentNode = findParent(node, diagramNodes)
            console.log('useOnNodeDragStop', node, parentNode)
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

                const updateChildren: IUpdateChildrenFunc = ({parentNode, node}) => {
                    console.log('useOnNodeDragStop.updateChildren', parentNode, node)
                    return {
                        ...node,
                        zIndex: parentNode.zIndex ? parentNode.zIndex + 1 : 12,
                        data:{
                            ...node.data,
                            defaultZIndex: parentNode.data.defaultZIndex ? parentNode.data.defaultZIndex + 1 : 12,
                        }
                    }
                }

                const updatedInnerChildren = recursiveUpdateChildren(diagramNodes, childNode, updateChildren)

                const nodesToUpdate = [childNode, ...updatedInnerChildren]
                console.log('useOnNodeDragStop.nodesToUpdate', nodesToUpdate)
                dispatch(bulkUpdateNodes(nodesToUpdate))
            }
        }

    }
}


