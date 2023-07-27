import {diagramEditorActions, useAppDispatch} from "../redux";
import {EElementType} from "../interface";

export const useSetEditElement = () => {
    const dispatch = useAppDispatch()
    const {setEditElement} = diagramEditorActions
    return ({id, elementType}: {
        id: string,
        elementType: EElementType,
    }) => {
        dispatch(setEditElement({
            id: id,
            elementType: elementType,
        }))
    }
}
