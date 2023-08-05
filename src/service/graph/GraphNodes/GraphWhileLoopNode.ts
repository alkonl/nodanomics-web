import {GraphLoopNode} from "./abstracts";
import {
    EConnectionMode,
    INumberVariable,
    isIIsEventTriggered,
    IUpdateGraphNodeState,
    IWhileLoopNodeData
} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphLogicManager} from "./helper/GraphLogicManager";

export class GraphWhileLoopNode extends GraphLoopNode<IWhileLoopNodeData>
    implements IUpdateGraphNodeState {

    private readonly logicManager: GraphLogicManager = new GraphLogicManager(this.incomingEdges);


    constructor(value: IWhileLoopNodeData, runManager: RunManager) {
        super(value, runManager)
    }


    protected checkIsLoopActive() {
        // this.updateNode({isLoopActive: this.isTriggeredIncomingNodes})
    }

    get isTriggeredIncomingNodes(): boolean {
        return this.incomingEdges.some(edge => {
            const source = edge.source;
            if (isIIsEventTriggered(source)) {
                return source.isEventTriggered(edge.data.sourceMode)
            }
            return false
        })
    }

    isEventTriggered(mode?: EConnectionMode) {
        if (mode === EConnectionMode.NodeOutgoing) {
            return this.isLoopWasActive && !this.isLoopActive
        } else if (mode === EConnectionMode.WhileLoopIncomingTrigger) {
            return this.isTriggeredIncomingNodes
        } else if (mode === EConnectionMode.LoopInnerToChildren) {
            return this.isTriggeredIncomingNodes
        }
        throw new Error(`isEventTriggered: unknown or empty mode ${mode}`)
    }

    protected updateVariables() {
        // const variables = this.logicManager.getVariables()
        // this.setVariables(variables)
    }

    private setVariables(variables: INumberVariable[]) {
        // this.updateNode({
        //     incomingData: {
        //         variables
        //     }
        // })
    }
}
