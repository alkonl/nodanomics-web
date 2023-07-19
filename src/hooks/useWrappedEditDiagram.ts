import {diagramEditorActions, useAppDispatch} from "../redux";
import {ArgumentTypes} from "../utils";

export const useWrappedEditDiagram = () => {
    const dispatch = useAppDispatch()
    const {addNode} = diagramEditorActions

    const addNodeHandler = (...payload: ArgumentTypes<typeof addNode>) => {
        dispatch(addNode(...payload))
    }

    return {
        addNode: addNodeHandler
    }
}
