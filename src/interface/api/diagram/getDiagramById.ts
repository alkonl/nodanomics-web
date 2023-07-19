import {IReactFlowEdge, IReactFlowNode} from "../../busines";

export interface IGetDiagramByIdResponse {
    id: string
    name: string
    elements: {
        diagramNodes: IReactFlowNode[]
        diagramEdges: IReactFlowEdge[]
    } | null
}
