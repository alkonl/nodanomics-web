import {IReactFlowNode} from '../interface';
import React, {useCallback} from "react";
// eslint-disable-next-line import/named
import {NodeDragHandler} from "reactflow";
import {useSetEditElement} from "./useSetEditElement";

export const useOnNodeDragStart = (): NodeDragHandler => {
    const setEditElement =  useSetEditElement()
    return useCallback((event: React.MouseEvent<Element, MouseEvent>, node: IReactFlowNode) => {
        setEditElement({
            id: node.data.id,
            elementType: node.data.elementType,
        })
    }, [])
}
