import {diagramEditorActions, useAppDispatch} from "../redux";

export const useDeleteNode = () => {
    const dispatch = useAppDispatch()
    const {deleteNode, renderState} = diagramEditorActions
    return (nodeIds: string[]) => {
        dispatch(deleteNode({
            nodeIds: nodeIds
        }))
        dispatch(renderState())
    }
}
