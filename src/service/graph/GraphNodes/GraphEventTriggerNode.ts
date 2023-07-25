import {GraphInvokableNode} from "./abstracts";
import {IEventTriggerNodeData, IFormulaNodeVariable, IUpdateGraphNodeState} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphMatchManager} from "./helper";

export class GraphEventTriggerNode extends GraphInvokableNode<IEventTriggerNodeData>
    implements IUpdateGraphNodeState {
    private readonly matchManager: GraphMatchManager = new GraphMatchManager(this.incomingEdges)

    constructor(value: IEventTriggerNodeData, runManager: RunManager) {
        super(value, runManager);
    }

    get eventName() {
        return this.data.eventName;
    }

    get eventCondition() {
        return this.data.eventCondition;
    }

    get isEventConditionMet() {
        return this.data.isEventConditionMet;
    }


    invokeStep() {
        this.updateState()
    }

    updateState() {
        this.updateVariables()
        this.updateResult()
    }

    private updateVariables() {
        const variables = this.matchManager.getVariables()
        this.setVariables(variables)
    }

    private updateResult() {
        if (this.eventCondition) {
            const result = this.matchManager.calculateFormula({
                formula: this.eventCondition,
            })
            if (typeof result === 'boolean') {
                this.setResult(result)
            } else if (result !== undefined) {
                throw new Error(`Unknown result type ${JSON.stringify(this.data)} result: ${JSON.stringify(result)}`)
            }
        }
    }

    private setVariables(variables: IFormulaNodeVariable[]) {
        this._data = {
            ...this.data,
            variables,
        }
    }

    private setResult(result: boolean) {
        this._data = {
            ...this.data,
            isEventConditionMet: result,
        }
    }
}
