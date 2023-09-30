import {GraphInvokableNode} from "./abstracts";
import {
    IEventTriggerNodeData,
    IIsEventConditionMet,
    IIsEventTriggered, IResetAfterDiagramRun, IResetBeforeStep,
    ITriggeredEvent,
    IUpdateGraphNodeState
} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphEventTriggerNode extends GraphInvokableNode<IEventTriggerNodeData>
    implements IUpdateGraphNodeState, IIsEventTriggered, ITriggeredEvent, IIsEventConditionMet, IResetBeforeStep, IResetAfterDiagramRun {


    constructor(value: IEventTriggerNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }

    get eventName() {
        return this.data.eventName;
    }

    get isEventConditionMet() {
        return this.data.isEventTriggered || false;
    }


    invokeStep() {
        super.invokeStep()
        this.updateState()
        this.triggerEvent()
    }

    resetAfterDiagramRun() {
        this.resetTriggeredEvent()
    }

    private triggerEvent() {
        this.updateNode({
            isEventTriggered: true,
        })
    }
    private resetTriggeredEvent() {
        this.updateNode({
            isEventTriggered: false,
        })
    }


    // TODO remove this method
    isEventTriggered() {
        return true
    }

    getTriggeredEvent(): string | undefined {
            return this.data.eventName
    }
}
