import {GraphInvokableNode} from "./abstracts";
import {IEventTriggerNodeData, INumberVariable, IUpdateGraphNodeState} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphMatchManager} from "./helper";
import {GraphLogicManager} from "./helper/GraphLogicManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphEventTriggerNode extends GraphInvokableNode<IEventTriggerNodeData>
    implements IUpdateGraphNodeState {
    private readonly matchManager: GraphMatchManager = new GraphMatchManager(this.incomingEdges)
    private readonly logicManager: GraphLogicManager = new GraphLogicManager(this.incomingEdges);

    constructor(value: IEventTriggerNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
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
        super.updateState()
        this.updateState()
    }

    updateState() {
        this.updateVariables()
        this.updateResult()
    }

    private updateVariables() {
        const variables = this.logicManager.getVariables()
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
                console.error(`Unknown result type ${JSON.stringify(this.data, null, 2)} result: ${JSON.stringify(result, null, 2)} `)
            }
        }
    }

    private setVariables(variables: INumberVariable[]) {
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
