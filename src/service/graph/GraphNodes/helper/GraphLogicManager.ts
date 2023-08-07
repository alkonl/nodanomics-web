import {GraphBaseEdge, GraphLogicEdge} from "../../GraphEdge";
import {EConnectionMode, INumberVariable, isIGetNodeExternalValue} from "../../../../interface";
import {GraphLoopNode} from "../abstracts";

export class GraphLogicManager {
    private readonly incomingEdges: GraphBaseEdge[]

    constructor(incomingEdges: GraphBaseEdge[]) {
        this.incomingEdges = incomingEdges
    }

    getVariables(required?: {
        targetMode?: EConnectionMode,
        sourceMode?: EConnectionMode,
    }): INumberVariable[] {
        try {
            const variables: INumberVariable[] = []
            this.getIncomingLogicEdge.forEach((edge) => {
                const source = edge.source
                const {targetMode} = edge.data
                if (isIGetNodeExternalValue(source)) {
                    if (!required || required.targetMode === targetMode) {
                        variables.push({
                            variableName: edge.variableName || 'unknown',
                            value: source.nodeExternalValue,
                        })
                    }
                } else if (source instanceof GraphLoopNode) {
                    console.log('take here edge', edge)
                    const values = this.getLoopVariable({edge})
                    if (values) {
                        variables.push(...values)
                    }
                }
            })
            return variables
        } catch (e) {
            console.error('error', e)
        }
        return []
    }

    private getLoopVariable({edge}: {
        edge: GraphLogicEdge,
    }): INumberVariable[] | undefined {
        const source = edge.source
        const sourceMode = edge.data.sourceMode
        const variableNames = edge.variableName?.trim().split(',') || []
        if (source instanceof GraphLoopNode) {
            const variables = sourceMode === EConnectionMode.NodeOutgoing ? source.outgoingVariables: source.incomingVariables
            return variableNames.map((variableName) => {
                const value = variables?.find((variable) => {
                    return variable.variableName === variableName
                })?.value
                return {
                    variableName: variableName,
                    value: value,
                }
            }).filter((variable) => variable !== undefined)
        }
    }

    private get getIncomingLogicEdge(): GraphLogicEdge[] {
        return this.incomingEdges.filter((edge) => {
            if (edge instanceof GraphLogicEdge) {
                return edge
            }
        }) as GraphLogicEdge[]
    }
}
