import {EElementType, IReactFlowNode} from '../interface';
import React, {useCallback} from "react";
// eslint-disable-next-line import/named
import {NodeDragHandler} from "reactflow";
import {diagramEditorActions, useAppDispatch} from "../redux";

export const useOnNodeDragStart = (): NodeDragHandler => {
    const dispatch = useAppDispatch()
    const {setEditElement} = diagramEditorActions
    return useCallback((event:  React.MouseEvent<Element, MouseEvent>, node: IReactFlowNode, nodes: IReactFlowNode[]) => {
        dispatch(setEditElement({
            id: node.data.id,
            elementType: node.data.elementType,
        }))
    }, [])
}
