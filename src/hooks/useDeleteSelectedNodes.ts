import {useDeleteNode} from "./useDeleteNode";
import {useDiagramEditorState} from "../redux";
import {useCallback} from "react";

export const useDeleteSelectedNodes = () => {
    const {diagramNodes} = useDiagramEditorState()
    const deleteNodes = useDeleteNode()

    return useCallback(() => {
        const nodesToDelete = diagramNodes.filter(node => node.selected)
            .map(node => node.id)
        deleteNodes(nodesToDelete)
    }, [diagramNodes])
}
