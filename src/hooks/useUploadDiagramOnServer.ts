import {useUpdateDiagramElementsMutation} from "../api";
import {useDiagramEditorState} from "../redux";
import {debounce} from "../utils";
import {useCallback, useEffect} from "react";
import {IReactFlowEdge, IReactFlowNode} from "../interface";

export const useUploadDiagramOnServer = () => {
    const [updateDiagram] = useUpdateDiagramElementsMutation();
    const {stateLess, currentDiagramId} = useDiagramEditorState()

    const uploadDiagram = useCallback(debounce((params: {
        diagramId: string, stateLessNodes: IReactFlowNode[], stateLessEdges: IReactFlowEdge[]
    }) => {
        const {diagramId, stateLessNodes, stateLessEdges} = params
        updateDiagram({
            diagramId: diagramId,
            elements: {
                diagramNodes: stateLessNodes,
                diagramEdges: stateLessEdges,
            }
        })
    }, 100), [])


    useEffect(() => {
        if (currentDiagramId) {
            uploadDiagram({
                diagramId: currentDiagramId,
                stateLessNodes: stateLess.stateLessNodes,
                stateLessEdges: stateLess.stateLessEdges
            })
        }
    }, [stateLess, currentDiagramId])
}
