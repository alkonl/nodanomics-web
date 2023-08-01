import {GraphBaseNode, GraphInvokableNode} from "./abstracts";
import {IEventListenerNodeData, IIsEventTriggered, IUpdateGraphNodeState} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphEventTriggerNode} from "./GraphEventTriggerNode";
import {GraphNodeManager} from "./helper";

export class GraphEventListenerNode extends GraphInvokableNode<IEventListenerNodeData>
    implements IIsEventTriggered, IUpdateGraphNodeState {

    private readonly graphNodeManager: GraphNodeManager;

    constructor(value: IEventListenerNodeData, runManager: RunManager, nodes: GraphNodeManager) {
        super(value, runManager);
        this.graphNodeManager = nodes
    }


    invokeStep() {
        this.updateState()
    }

    updateState() {
        this.checkIsEventTriggered()
    }

    get isEventTriggered() {
        return this.data.isEventTriggered
    }

    get eventName() {
        return this.data.eventName;
    }


    get triggeredNodes() {
        return this.graphNodes.filter(node => {
            if (node instanceof GraphEventTriggerNode) {
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
