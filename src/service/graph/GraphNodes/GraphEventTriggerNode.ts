import {GraphInvokableNode} from "./abstracts";
import {
    IEventTriggerNodeData,
    IIsEventConditionMet,
    IIsEventTriggered,
    ITriggeredEvent,
    IUpdateGraphNodeState
} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphEventTriggerNode extends GraphInvokableNode<IEventTriggerNodeData>
    implements IUpdateGraphNodeState, IIsEventTriggered, ITriggeredEvent, IIsEventConditionMet {


    constructor(value: IEventTriggerNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }

    get eventName() {
        return this.data.eventName;
    }

    get isEventConditionMet() {
        return true;
    }


    invokeStep() {
        super.updateState()
        this.updateState()
    }

    isEventTriggered() {
        return true
    }

    getTriggeredEvent(): string | undefined {
            return this.data.eventName
    }
}
