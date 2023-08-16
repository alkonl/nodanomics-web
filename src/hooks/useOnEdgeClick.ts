import React from "react";
import {EElementType, IReactFlowEdge} from "../interface";
import {diagramEditorActions, useAppDispatch} from "../redux";

export const useOnEdgeClick = () => {
    const dispatch = useAppDispatch()
    const {setEditElement} = diagramEditorActions
    return (event: React.MouseEvent<Element, MouseEvent>, edge: IReactFlowEdge) => {
        dispatch(setEditElement({
            id: edge.id,
            elementType: EElementType.Connection,
        }))
    }
}
