import {INumberVariable, isIGetNodeExternalValue} from "../../../../interface";
import {GraphBaseEdge, GraphLogicEdge} from "../../GraphEdge";
import * as Match from "mathjs";
import {GraphLogicManager} from "./GraphLogicManager";

export class GraphMatchManager {
    private readonly incomingEdges: GraphBaseEdge[]
    private readonly logicManager: GraphLogicManager

    constructor(incomingEdges: GraphBaseEdge[]) {
        this.incomingEdges = incomingEdges
        this.logicManager = new GraphLogicManager(incomingEdges)
    }


    calculateFormula({formula}: { formula: string }) {
        try {
            if (formula) {
                const compiledFormula = Match.compile(formula)
                const variables = this.logicManager.getVariables().reduce((acc: {
                    [key: string]: number
                }, variable) => {
                    const variableName = variable.variableName || '-'
                    if(variable.value) {
                        acc[variableName] = variable.value
                    }
                    return acc
                }, {})
                return compiledFormula.evaluate(variables)
            }
        } catch (e) {
            console.error(e)
        }

    }

    // private get getIncomingLogicEdge(): GraphLogicEdge[] {
    //     return this.incomingEdges.filter((edge) => {
    //         if (edge instanceof GraphLogicEdge) {
    //             return edge
    //         }
    //     }) as GraphLogicEdge[]
    // }

}
