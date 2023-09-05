import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {isINodeHistory} from "../interface";
import {useCallback} from "react";

export const useClearHistory = () => {
    const {diagramNodes} = useDiagramEditorState()
    const dispatch = useAppDispatch()

    return useCallback(() => {
        const nodesWithClearStatistic = diagramNodes.map(node => {
            if (isINodeHistory(node.data)) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        history: [],
                    }
                }
            }
            return node
        })
        dispatch(diagramEditorActions.bulkUpdateNodes(nodesWithClearStatistic))
    }, [diagramNodes])
}
