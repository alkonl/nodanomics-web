import {MouseEvent as ReactMouseEvent, useCallback} from "react";
import {IReactFlowNode} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {resizeParentOnDrag} from "../service";


export const useOnNodeDrag = () => {
    const dispatch = useAppDispatch()
    const {diagramNodes} = useDiagramEditorState()

    const updateNodeSize = (params: {
        nodeId: string,
        size: { width: number, height: number }
    }) => {
        dispatch(diagramEditorActions.updateNodeSize(params))
    }

    return useCallback((event: ReactMouseEvent, node: IReactFlowNode) => {
        resizeParentOnDrag({diagramNodes, node, event, updateNodeSize})
    }, [dispatch, diagramNodes])
}
