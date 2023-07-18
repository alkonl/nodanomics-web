import {diagramEditorActions, useAppDispatch} from "../redux";

export const useResetDiagramRun = () => {
    const dispatch = useAppDispatch()
    const {invokeStep} = diagramEditorActions
    return () => {
        //
    }
}
