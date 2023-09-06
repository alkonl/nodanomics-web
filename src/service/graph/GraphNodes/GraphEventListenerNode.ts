import {GraphBaseNode, GraphInvokableNode} from "./abstracts";
import {
    IEventListenerNodeData,
    IIsEventTriggered, IResetBeforeStep,
    isIIsEventConditionMet,
    IUpdateGraphNodeState
} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphEventListenerNode extends GraphInvokableNode<IEventListenerNodeData>
    implements IIsEventTriggered, IUpdateGraphNodeState{

    private readonly graphNodeManager: GraphNodeManager;

    constructor(value: IEventListenerNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
        this.graphNodeManager = nodeManager
    }


    invokeStep() {
        super.invokeStep()
        super.updateState()
        this.updateState()
    }

    updateState() {
        this.checkIsEventTriggered()
    }

    isEventTriggered(): boolean {
        this.checkIsEventTriggered()
        return this.data.isEventTriggered || false
    }

    get eventName() {
        return this.data.eventName;
    }


    get triggeredNodes() {
        return this.graphNodes.filter(node => {
            if (isIIsEventConditionMet(node)) {
                return node.eventName === this.eventName && node.isEventConditionMet
            }
            return false
        })
    }


    checkIsEventTriggered() {
        const isEventTriggered = this.triggeredNodes.length > 0
        this.setIsEventTriggered(isEventTriggered)
        return isEventTriggered
    }


    private setIsEventTriggered(isEventTriggered: boolean) {
        this._data = {
            ...this.data,
            isEventTriggered,
        }
    }

    private get graphNodes() {
        return this.graphNodeManager.nodes
    }

    static isGraphEventListenerNode(node: GraphBaseNode): node is GraphEventListenerNode {
        return node instanceof GraphEventListenerNode
    }
}
