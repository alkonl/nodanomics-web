import {useUpdateDiagramElementsMutation} from "../api";
import {useDiagramEditorState} from "../redux";
import {debounce} from "../utils";
import {useCallback, useEffect} from "react";
import {IReactFlowEdge, IReactFlowNode} from "../interface";
import {resetNodeStates} from "../service";

export const useUploadDiagramOnServer = () => {
    const [updateDiagram] = useUpdateDiagramElementsMutation();
    const {diagramNodes,diagramEdges, currentDiagramId,autoSaveCalled} = useDiagramEditorState()

    const uploadDiagram = useCallback(debounce((params: {
        diagramId: string, nodes: IReactFlowNode[], edges: IReactFlowEdge[]
    }) => {
        const {diagramId, nodes, edges} = params
        const withoutStateNodes = resetNodeStates(nodes)
        updateDiagram({
            diagramId: diagramId,
            elements: {
                diagramNodes: withoutStateNodes,
                diagramEdges: edges,
            }
        })
    }, 100), [])


    useEffect(() => {
        if (currentDiagramId) {
            uploadDiagram({
                diagramId: currentDiagramId,
                nodes: diagramNodes,
                edges: diagramEdges
            })
        }
    }, [autoSaveCalled, currentDiagramId])
}
