import {ChangeEvent, useState} from "react";
import {readFileAsText} from "../utils";
import {EDiagramNode, IImportAndExport, IReactFlowEdge, isINodeDatasetRecorder} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {changeElementIds} from "../service";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";
import {useUploadJsonBodySpreadsheetsMutation} from "../api";
import {useOpenedDiagramProject} from "./useOpenedDiagramProject";

export const useUploadDiagram = () => {
    const dispatch = useAppDispatch()
    const {diagramNodes, spreadsheets} = useDiagramEditorState()
    const [uploadSpreadsheet] = useUploadJsonBodySpreadsheetsMutation()
    const diagramStartNode = diagramNodes.find(node => node.data.type === EDiagramNode.Start)
    const project = useOpenedDiagramProject()
    const {addManyNodes, addManyEdges} = diagramEditorActions
    const offHistory = useOffHistoryExecuted()
    const [importDiagramState, setImportDiagramState] = useState<{
        parsedDiagram?: IImportAndExport,
        sameSpreadsheetNames: {
            spreadsheetId: string
            name: string
        }[],
    }>()

    const importDiagram = async (parsedData: IImportAndExport) => {
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
                if (node.data.type === EDiagramNode.DatasetDatafield && node.data.datasetId && updatedSpreadsheetIds) {
                    const oldSpreadsheetId = node.data.datasetId
                    const newSpreadsheetId = updatedSpreadsheetIds.find(spreadsheetId => spreadsheetId.previousSpreadsheetId === oldSpreadsheetId)?.newSpreadsheetId
                    return {

                        ...node,
                        data: {
                            ...node.data,
                            datasetId: newSpreadsheetId,
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

    const handleAndParsFile = async (event: ChangeEvent<HTMLInputElement>): Promise<IImportAndExport | undefined> => {
        const file = event.target.files?.[0];
        if (file) {
            const data = await readFileAsText(file)
            event.target.value = ''
            return JSON.parse(data) as IImportAndExport
        }
        event.target.value = ''
    }

    const checkIfProjectHasSameSpreadsheet = (data: IImportAndExport) => {
        const importedSpreadsheets = data.spreadsheets
        const existingSpreadsheets: {
            spreadsheetId: string
            name: string
        }[] = []
        if (spreadsheets) {
            importedSpreadsheets.forEach((importedSpreadsheet) => {
                const alreadyExistedSpreadsheet = Object.keys(spreadsheets).find((existedSpreadsheetId) => {
                    if (existedSpreadsheetId === importedSpreadsheet.id) {
                        return true
                    }
                })
                if (alreadyExistedSpreadsheet) {
                    existingSpreadsheets.push({
                        spreadsheetId: importedSpreadsheet.id,
                        name: importedSpreadsheet.name
                    })
                }
            })
        }

        return existingSpreadsheets
    }

    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const parsedData = await handleAndParsFile(event)
        if (parsedData) {
            const sameSpreadsheetNames = checkIfProjectHasSameSpreadsheet(parsedData)
            setImportDiagramState({
                parsedDiagram: parsedData,
                sameSpreadsheetNames: sameSpreadsheetNames,
            })
        }
    }


    const cancelImport = () => {
        setImportDiagramState(undefined)
    }


    const approveImport = async (params: {
        spreadsheetsToOverwrite: string[]
    }) => {
        console.log('approveImport.params.spreadsheetsToOverwrite: ', params.spreadsheetsToOverwrite)
        if (importDiagramState?.parsedDiagram) {
            const filteredSpreadsheets = spreadsheets ? importDiagramState?.parsedDiagram.spreadsheets.filter(importedSpreadsheet => {
                const isExisted = Object.keys(spreadsheets).find((existedSpreadsheetId) => {
                    if (existedSpreadsheetId === importedSpreadsheet.id) {
                        return true
                    }
                })
                if (isExisted && !params.spreadsheetsToOverwrite.includes(importedSpreadsheet.id)) {
                    return false
                }
                return true
            }) : importDiagramState?.parsedDiagram.spreadsheets
            const preparedDiagram = {
                ...importDiagramState?.parsedDiagram,
                spreadsheets: filteredSpreadsheets,
            }
            await importDiagram(preparedDiagram)
            setImportDiagramState(undefined)
        }
    }

    return {
        uploadFile,
        importDiagramState,
        cancelImport,
        approveImport,
    }
}
