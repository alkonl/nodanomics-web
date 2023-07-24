import {diagramEditorActions, useAppDispatch} from "../redux";

export const useResetDiagramRun = () => {
    const dispatch = useAppDispatch()
    const {resetDiagramRun} = diagramEditorActions
    const resetDiagramRunHandle = () => {
        dispatch(resetDiagramRun())
    }
    return {
        resetDiagramRun: resetDiagramRunHandle
    }
}
