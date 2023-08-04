import {GraphBaseEdge, GraphLogicEdge} from "../../GraphEdge";
import {INumberVariable, isIGetNodeExternalValue} from "../../../../interface";
import {GraphLoopNode} from "../abstracts";

export class GraphLogicManager {
    private readonly incomingEdges: GraphBaseEdge[]

    constructor(incomingEdges: GraphBaseEdge[]) {
        this.incomingEdges = incomingEdges
    }

    getVariables(): INumberVariable[] {
        return this.getIncomingLogicEdge.map((edge) => {
            const source = edge.source
            if (isIGetNodeExternalValue(source)) {
                return {
                    variableName: edge.variableName,
                    value: source.nodeExternalValue,
                }
            } else if (source instanceof GraphLoopNode) {
                const value = source.incomingData?.variables?.find((variable) => {
                    return variable.variableName === edge.variableName
                })?.value
                return {
                    variableName: edge.variableName,
                    value: value,
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
