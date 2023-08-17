// eslint-disable-next-line import/named
import {EDiagramNode, IReactFlowNode, isINodeSize} from "../interface";
import {MouseEvent as ReactMouseEvent} from "react";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {findParent} from "../service";



export const useOnNodeDragStop = () => {
    const {diagramNodes} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    const {updateNodeParent} = diagramEditorActions
    return (event: ReactMouseEvent, node: IReactFlowNode) => {
        const parentNode = findParent(node, diagramNodes)
        if (parentNode && !parentNode.data.isCollapsed) {
            dispatch(updateNodeParent({
                node,
                parentNode
            }))
        }
    }
}


