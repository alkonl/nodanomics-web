import {useEffect} from "react";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {createBaseNode} from "../service/reactflow/node/createBaseNode";
import {EDiagramNode} from "../interface";
import {useDidMountEffect} from "./useDidMountEffect";

export const useAddStartNode = () => {
    const dispatch = useAppDispatch()
    const {diagramNodes, currentDiagramId} = useDiagramEditorState()
    const {addNode} = diagramEditorActions

    useDidMountEffect(() => {
        const isEditorHasStartNode = diagramNodes.some(node => node.type === EDiagramNode.Start)

        if (!isEditorHasStartNode) {
            const startNode = createBaseNode({
                type: EDiagramNode.Start,
                position: {x: 0, y: 0}
            })
            dispatch(addNode(startNode))
        }

    }, [diagramNodes]);

}
