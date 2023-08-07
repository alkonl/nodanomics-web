import {
    IFormulaNodeData,
    INumberVariable,
    IFormulaResult,
    IGetNodeExternalValue,
    IUpdateGraphNodeState
} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphInvokableNode} from "./abstracts";
import {GraphMatchManager} from "./helper";
import {GraphLogicManager} from "./helper/GraphLogicManager";

export class GraphFormulaNode extends GraphInvokableNode<IFormulaNodeData>
    implements IUpdateGraphNodeState, IGetNodeExternalValue {

    private readonly matchManager: GraphMatchManager = new GraphMatchManager(this.incomingEdges)
    private readonly logicManager: GraphLogicManager = new GraphLogicManager(this.incomingEdges);

    constructor(value: IFormulaNodeData, runManager: RunManager) {
        super(value, runManager);
    }

    get formula() {
        return this.data.formula;
    }

    get nodeExternalValue() {
        if(typeof this.result?.value === 'number') {
            return this.result?.value
        }
    }

    get result() {
        return this.data.result;
    }

    invokeStep() {
        this.updateState()
    }

    updateState() {
        this.updateVariables()
        this.updateResult()
    }


    private updateResult() {
        if (this.formula) {
            const result = this.matchManager.calculateFormula({
                formula: this.formula,
            })
            if (typeof result === 'boolean') {
                this.setResult({
                    type: 'boolean',
                    value: result,
                })
            } else if (typeof result === 'number') {
                this.setResult({
                    type: 'number',
                    value: result,
                })
            } else if (result !== undefined) {
                console.error(`Unknown result type ${JSON.stringify(this.data)} result: ${JSON.stringify(result, null, 2)}`)
            }
        }
    }

    private updateVariables() {
        const variables = this.logicManager.getVariables()
        this.setVariables(variables)
    }


    private setResult(result: IFormulaResult) {
        this._data = {
            ...this.data,
            result,
        }
    }

    private setVariables(variables: INumberVariable[]) {
        // this._data = {
        //     ...this.data,
        // }
    }
}
