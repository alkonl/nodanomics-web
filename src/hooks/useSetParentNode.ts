import {useCallback} from "react";
import {IReactFlowNode} from "../interface";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {findParent} from "../service";

export const useSetParentNode = () => {
    const dispatch = useAppDispatch()
    const {updateNodeParent} = diagramEditorActions
    return useCallback((node: IReactFlowNode, nodes: IReactFlowNode[]) => {
            const parentNode = findParent(node, nodes)
            if (parentNode) {
                dispatch(updateNodeParent({
                    node,
                    parentNode
                }))
            }
    }, [ dispatch])
}
