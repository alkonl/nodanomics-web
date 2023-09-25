import {useEffect} from "react";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {createBaseNode} from "../service/reactflow/node/createBaseNode";
import {EDiagramNode} from "../interface";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";

export const useAddStartNode = () => {
    const dispatch = useAppDispatch()
    const {diagramNodes, settings} = useDiagramEditorState()
    const {addNode} = diagramEditorActions

    const offHistoryExecuted = useOffHistoryExecuted()

    useEffect(() => {
        const isEditorHasStartNode = diagramNodes.some(node => node.type === EDiagramNode.Start)
        const selectedLayerId = settings.layers?.find(layer => layer.isSelected)?.id
        if (!isEditorHasStartNode && selectedLayerId) {
            const startNode = createBaseNode({
                type: EDiagramNode.Start,
                position: {x: 0, y: 0},
                layerId: selectedLayerId,
            })
            offHistoryExecuted('useAddStartNode')
            dispatch(addNode(startNode))
        }

    }, [diagramNodes, settings.layers]);

}
