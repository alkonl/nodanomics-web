import {IReactFlowNode} from "../node";
import {IReactFlowEdge} from "../connection";
import {ISpreadsheetView} from "../../spreadsheet";

export interface IImportAndExport {
    diagramName: string
    nodes: IReactFlowNode[]
    edges: IReactFlowEdge[]
    spreadsheets: ISpreadsheetView[]
}
