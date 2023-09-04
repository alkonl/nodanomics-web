import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";

export const useUndoRedoDiagram = () => {
    const dispatch = useAppDispatch();

    const {history} = useDiagramEditorState()

    const undoDiagram = () => {
        const last = history.past[history.past.length - 1]

        if (last) {
            dispatch(diagramEditorActions.undo())
            dispatch(diagramEditorActions.setDiagramElements(last))
        }
    }

    const redoDiagram = () => {
        if (history.future.length > 0) {
            dispatch(diagramEditorActions.redo())
            dispatch(diagramEditorActions.setDiagramElements(history.future[history.future.length - 1]))
        }
    }

    return {undoDiagram, redoDiagram};
}
