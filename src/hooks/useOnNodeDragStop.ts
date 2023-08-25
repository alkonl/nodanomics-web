// eslint-disable-next-line import/named
import {IReactFlowNode} from "../interface";
import {MouseEvent as ReactMouseEvent} from "react";
import {useDiagramEditorState} from "../redux";
import {useSetParentNode} from "./useSetParentNode";


export const useOnNodeDragStop = () => {
    const {diagramNodes} = useDiagramEditorState()
    const setParent = useSetParentNode()
    return (event: ReactMouseEvent, node: IReactFlowNode) => {
        setParent(node, diagramNodes)
    }
}


