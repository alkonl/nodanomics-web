import {GraphBaseNode} from "./abstracts";
import {IEventTriggerNodeData, IFormulaNodeVariable, IUpdateGraphNodeState} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphVariableManager} from "./helper";

export class GraphEventTriggerNode extends GraphBaseNode<IEventTriggerNodeData>
    implements IUpdateGraphNodeState {
    private readonly variableManager: GraphVariableManager = new GraphVariableManager(this.incomingEdges)

    constructor(value: IEventTriggerNodeData, runManager: RunManager) {
        super(value, runManager);
    }

    updateState() {
        this.updateVariables()
    }

    private updateVariables() {
        const variables = this.variableManager.getVariables()
        this.setVariables(variables)
    }

    private setVariables(variables: IFormulaNodeVariable[]) {
        this._data = {
            ...this.data,
            variables,
        }
    }
}
