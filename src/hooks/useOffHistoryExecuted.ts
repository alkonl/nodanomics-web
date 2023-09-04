import {diagramEditorActions, useAppDispatch} from "../redux";

export const useOffHistoryExecuted = () => {
    const dispatch = useAppDispatch();
    return (executedBy: string) => {
        dispatch(diagramEditorActions.offHistoryExecuted({
            executedBy
        }))
    }
}
