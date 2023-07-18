import {IFormulaNodeData, IFormulaNodeVariable} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphInvokableNode} from "./GraphInvokable";
import {GraphLogicEdge} from "../GraphEdge/GraphLogicEdge";
import {GraphPoolNode} from "./GraphPoolNode";

export class GraphFormulaNode extends GraphInvokableNode<IFormulaNodeData> {
    constructor(value: IFormulaNodeData, runManager: RunManager) {
        super(value, runManager);
    }

    get formula() {
        return this.data.formula;
    }

    get variable() {
        return this.data;
    }

    invokeStep() {
        const variables = this.getVariables()
        this.setVariables(variables)
    }

    setVariables(variables: IFormulaNodeVariable[]) {
        this._data = {
            ...this.data,
            variables,
        }
    }

    private get getIncomingLogicEdge(): GraphLogicEdge[] {
        return this.incomingEdges.filter((edge) => {
            if (edge instanceof GraphLogicEdge) {
                return edge
            }
        }) as GraphLogicEdge[]
    }

    private getVariables(): IFormulaNodeVariable[] {
        return this.getIncomingLogicEdge.map((edge) => {
            if (edge.source instanceof GraphPoolNode) {
                return {
                    variableName: edge.variableName,
                    value: edge.source.resourcesCount,
                }
            }
        }).filter((variable) => variable !== undefined) as IFormulaNodeVariable[]
    }

}
