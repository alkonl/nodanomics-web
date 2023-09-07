import {useDownloadJsonFile} from "./useDownloadJsonFile";
import {useDiagramEditorState} from "../redux";
import {IImportAndExport} from "../interface";

export const useDownloadDiagram = () => {
    const {diagramNodes, diagramEdges, name} = useDiagramEditorState()
    const {downloadJsonFile} = useDownloadJsonFile();
    return () => {
        const diagramToDownload: IImportAndExport = {
            diagramName: name || 'undefined',
            nodes: diagramNodes,
            edges: diagramEdges
        }
        downloadJsonFile(diagramToDownload, `${name}.json`);
    }
}
