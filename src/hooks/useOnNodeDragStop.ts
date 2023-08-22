// eslint-disable-next-line import/named
import {IReactFlowNode} from "../interface";
import {MouseEvent as ReactMouseEvent} from "react";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {findParent} from "../service";


export const useOnNodeDragStop = () => {
    const {diagramNodes} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    const {updateNodeParent} = diagramEditorActions
    return (event: ReactMouseEvent, node: IReactFlowNode) => {
        if (node.parentNode === undefined) {
            const parentNode = findParent(node, diagramNodes)
            console.log('useOnNodeDragStop', node, parentNode)
            if (parentNode && !parentNode.data.isCollapsed) {
                dispatch(updateNodeParent({
                    node,
                    parentNode
                }))
            }
        }

    }
}


