import {MouseEvent as ReactMouseEvent, useCallback} from "react";
import {IReactFlowNode} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {resizeParentOnDrag} from "../service";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";


export const useOnNodeDrag = () => {
    const dispatch = useAppDispatch()
    const {diagramNodes} = useDiagramEditorState()

    const updateNodeSize = (params: {
        nodeId: string,
        size: { width: number, height: number }
    }) => {
        dispatch(diagramEditorActions.updateNodeSize(params))
    }
    const offHistoryExecuted = useOffHistoryExecuted()
    return useCallback((event: ReactMouseEvent, node: IReactFlowNode) => {
        offHistoryExecuted('onNodeDrag')
        resizeParentOnDrag({diagramNodes, node, event, updateNodeSize})

    }, [dispatch, diagramNodes])
}
