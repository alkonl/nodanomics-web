import {IFormulaNodeVariable} from "../../../../interface";
import {GraphPoolNode} from "../GraphPoolNode";
import {GraphBaseEdge, GraphLogicEdge} from "../../GraphEdge";

export class GraphVariableManager {

    incomingEdges: GraphBaseEdge[]

    constructor(incomingEdges: GraphBaseEdge[]) {
        this.incomingEdges = incomingEdges
    }

    getVariables(): IFormulaNodeVariable[] {
        return this.getIncomingLogicEdge.map((edge) => {
            if (edge.source instanceof GraphPoolNode) {
                return {
                    variableName: edge.variableName,
                    value: edge.source.resourcesCount,
                }
            }
        }).filter((variable) => variable !== undefined) as IFormulaNodeVariable[]
    }

    private get getIncomingLogicEdge(): GraphLogicEdge[] {
        return this.incomingEdges.filter((edge) => {
            if (edge instanceof GraphLogicEdge) {
                return edge
            }
        }) as GraphLogicEdge[]
    }
}
