import {IReactFlowNode} from '../interface';
import React, {useCallback} from "react";
// eslint-disable-next-line import/named
import {NodeDragHandler} from "reactflow";
import {useSetEditElement} from "./useSetEditElement";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";

export const useOnNodeDragStart = (): NodeDragHandler => {
    const offHistoryExecuted = useOffHistoryExecuted()
    const setEditElement =  useSetEditElement()
    return useCallback((event: React.MouseEvent<Element, MouseEvent>, node: IReactFlowNode) => {
        offHistoryExecuted('onNodeDragStart')
        setEditElement({
            id: node.data.id,
            elementType: node.data.elementType,
        })
    }, [])
}
