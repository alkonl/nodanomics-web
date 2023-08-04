import {GraphBaseEdge, GraphLogicEdge} from "../../GraphEdge";
import {INumberVariable, isIGetNodeExternalValue} from "../../../../interface";

export class GraphLogicManager {
    private readonly incomingEdges: GraphBaseEdge[]

    constructor(incomingEdges: GraphBaseEdge[]) {
        this.incomingEdges = incomingEdges
    }

    getVariables(): INumberVariable[] {
        return this.getIncomingLogicEdge.map((edge) => {

            //edge.source instanceof GraphVariableNode
            const source = edge.source
            console.log(`edge ${edge.variableName}:`, edge.data)
            if (isIGetNodeExternalValue(source)) {
                return {
                    variableName: edge.variableName,
                    value: source.nodeExternalValue,
                }
            }
        }).filter((variable) => variable !== undefined) as INumberVariable[]
    }


    private get getIncomingLogicEdge(): GraphLogicEdge[] {
        return this.incomingEdges.filter((edge) => {
            if (edge instanceof GraphLogicEdge) {
                return edge
            }
        }) as GraphLogicEdge[]
    }
}
