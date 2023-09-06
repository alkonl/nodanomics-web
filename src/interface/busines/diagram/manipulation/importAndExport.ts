import {IReactFlowNode} from "../node";
import {IReactFlowEdge} from "../connection";

export interface IImportAndExport {
    diagramName: string
    nodes: IReactFlowNode[]
    edges: IReactFlowEdge[]
}
