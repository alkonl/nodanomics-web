import React from "react";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";

export const useToggleResourceAnimationLatency = () => {
    const dispatch = useAppDispatch()
    const {isResourceAnimationLatency} = useDiagramEditorState().settings
    const toggleResourceAnimationLatency = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        dispatch(diagramEditorActions.setResourceAnimationLatency(checked))
    }
    return {
        toggleResourceAnimationLatency,
        isResourceAnimationLatency,
    }
}
