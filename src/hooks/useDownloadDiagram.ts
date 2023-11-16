import {useDownloadJsonFile} from "./useDownloadJsonFile";
import {useDiagramEditorState} from "../redux";
import {IImportAndExport, ISpreadsheetView} from "../interface";
import {joinLocalAndServerSpreadsheet} from "../service";
import {useGetManySpreadsheetQuery} from "../api";

export const useDownloadDiagram = () => {
    const {diagramNodes, diagramEdges, name} = useDiagramEditorState()
    const {downloadJsonFile} = useDownloadJsonFile();
    const {spreadsheets} = useDiagramEditorState()


    const projectSpreadsheetIds = spreadsheets ? Object.keys(spreadsheets) : undefined

    const {data: projectSpreadsheets} = useGetManySpreadsheetQuery({
        spreadsheetIds: projectSpreadsheetIds,
    }, {
        skip: !projectSpreadsheetIds,
    })

    const mappedSpreadsheet: ISpreadsheetView[] = []
    if (spreadsheets) {
        Object.entries(spreadsheets).forEach(([spreadsheetId, spreadsheetStoreData]) => {
            const spreadsheetData = projectSpreadsheets?.find((spreadsheet) => spreadsheet.id === spreadsheetId)
            if (spreadsheetData) {
                mappedSpreadsheet.push(joinLocalAndServerSpreadsheet(spreadsheetData, spreadsheetStoreData, spreadsheetId))
            }
        })
    }

    return () => {
        const diagramToDownload: IImportAndExport = {
            diagramName: name || 'undefined',
            nodes: diagramNodes,
            edges: diagramEdges,
            spreadsheets: mappedSpreadsheet,
        }
        downloadJsonFile(diagramToDownload, `${name}.json`);
    }
}
