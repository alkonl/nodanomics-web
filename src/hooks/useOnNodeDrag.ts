import {MouseEvent as ReactMouseEvent, useCallback} from "react";
import {IReactFlowNode} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {geAllChildrenNodes, resizeParentOnDrag} from "../service";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";
import {useReactFlowInstance} from "./useReactFlowInstance";


export const useOnNodeDrag = () => {
    const dispatch = useAppDispatch()
    const {diagramNodes} = useDiagramEditorState()

    const updateNodeSize = (params: {
        nodeId: string,
        size: { width: number, height: number }
    }) => {
        dispatch(diagramEditorActions.updateNodeSize(params))
    }
    const {reactFlowInstance} = useReactFlowInstance().data

    const offHistoryExecuted = useOffHistoryExecuted()
    return useCallback((event: ReactMouseEvent, node: IReactFlowNode) => {
        offHistoryExecuted('onNodeDrag')
        resizeParentOnDrag({diagramNodes, node, event, updateNodeSize})

        const nodesWithActualAbsolutePosition = reactFlowInstance?.getNodes() as IReactFlowNode[]
        if (nodesWithActualAbsolutePosition) {
            const childrenUpdatePosition = geAllChildrenNodes({
                nodes: nodesWithActualAbsolutePosition,
                parentId: node.id
            })
            dispatch(diagramEditorActions.bulkUpdateNodes(childrenUpdatePosition))
        }

    }, [dispatch, diagramNodes])
}
