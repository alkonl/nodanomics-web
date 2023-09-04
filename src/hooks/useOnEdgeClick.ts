import React from "react";
import {EElementType, IReactFlowEdge} from "../interface";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";

export const useOnEdgeClick = () => {
    const dispatch = useAppDispatch()
    const {setEditElement} = diagramEditorActions

    const offHistoryExecuted = useOffHistoryExecuted()
    return (event: React.MouseEvent<Element, MouseEvent>, edge: IReactFlowEdge) => {
        offHistoryExecuted('onEdgeClick')
        dispatch(setEditElement({
            id: edge.id,
            elementType: EElementType.Connection,
        }))
    }
}
