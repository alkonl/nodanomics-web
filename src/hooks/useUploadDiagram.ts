import {ChangeEvent} from "react";
import {readFileAsText} from "../utils";
import {EDiagramNode, IImportAndExport} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {changeElementIds} from "../service";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";

export const useUploadDiagram = () => {
    const dispatch = useAppDispatch()
    const {diagramNodes} = useDiagramEditorState()
    const diagramStartNode = diagramNodes.find(node => node.data.type === EDiagramNode.Start)

    const {addManyNodes, addManyEdges} = diagramEditorActions
    const offHistory = useOffHistoryExecuted()

    return async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const data = await readFileAsText(file)
            const parsedData: IImportAndExport = JSON.parse(data)
            const updatedElements = changeElementIds({
                nodes: parsedData.nodes,
                edges: parsedData.edges
            })
            const startId = updatedElements.nodes.find(node => {
                return node.data.type === EDiagramNode.Start
            })?.id

            offHistory('useUploadDiagram')

            if (startId && diagramStartNode) {
                const updatedEdges = updatedElements.edges.map(edge => {
                    const isConnectedToStart = edge.source === startId
                    const source = isConnectedToStart ? diagramStartNode?.id : edge.source
                    return {
                        ...edge,
                        source
                    }
                })
                const updatedNodes = updatedElements.nodes.filter(node => node.data.type !== EDiagramNode.Start)
                dispatch(addManyNodes(updatedNodes))
                dispatch(addManyEdges(updatedEdges))
            } else {
                dispatch(addManyNodes(updatedElements.nodes))
                dispatch(addManyEdges(updatedElements.edges))
            }


        }
        event.target.value = ''

    }
}
