import {ChangeEvent} from "react";
import {readFileAsText} from "../utils";
import {EDiagramNode, IImportAndExport, IReactFlowEdge, isINodeDatasetRecorder} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {changeElementIds} from "../service";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";
import {useUploadJsonBodySpreadsheetsMutation} from "../api";
import {useOpenedDiagramProject} from "./useOpenedDiagramProject";

export const useUploadDiagram = () => {
    const dispatch = useAppDispatch()
    const {diagramNodes} = useDiagramEditorState()
    const [uploadSpreadsheet] = useUploadJsonBodySpreadsheetsMutation()
    const diagramStartNode = diagramNodes.find(node => node.data.type === EDiagramNode.Start)
    const project = useOpenedDiagramProject()
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

            // manage spreadsheets
            let updatedSpreadsheetIds: {
                previousSpreadsheetId: string,
                newSpreadsheetId: string,
            }[] | undefined = undefined
            if (parsedData.spreadsheets && parsedData.spreadsheets.length > 0 && project) {
                const savedSpreadsheetIds = await uploadSpreadsheet({
                    spreadsheets: parsedData.spreadsheets,
                    projectId: project.id,
                })
                if ('data' in savedSpreadsheetIds) {
                    updatedSpreadsheetIds = savedSpreadsheetIds.data
                }
            }

            // manage nodes and edges
            if (startId && diagramStartNode) {
                console.log('updatedSpreadsheetIds: ', updatedSpreadsheetIds)
                const updatedEdges = updatedElements.edges.map(edge => {
                    const isConnectedToStart = edge.source === startId
                    const source = isConnectedToStart ? diagramStartNode?.id : edge.source
                    return {
                        ...edge,
                        data: {
                            ...edge.data,
                            sourceId: source,
                        },
                        source
                    } as IReactFlowEdge
                })
                const updatedNodes = updatedElements.nodes.filter(node => node.data.type !== EDiagramNode.Start).map(node => {
                    if (isINodeDatasetRecorder(node.data) && node.data.datasetReceiverId && updatedSpreadsheetIds) {
                        const datasetReceiverId = node.data.datasetReceiverId
                        const updatedSpreadsheetId = updatedSpreadsheetIds.find(spreadsheetId => spreadsheetId.previousSpreadsheetId === datasetReceiverId)?.newSpreadsheetId
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                datasetReceiverId: updatedSpreadsheetId,
                            }
                        }
                    }
                    return node
                })
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
