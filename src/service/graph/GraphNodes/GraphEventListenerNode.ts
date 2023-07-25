import {GraphBaseNode, GraphInvokableNode} from "./abstracts";
import {IEventListenerNodeData} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphEventTriggerNode} from "./GraphEventTriggerNode";

export class GraphEventListenerNode extends GraphInvokableNode<IEventListenerNodeData>{

    private readonly nodes: GraphBaseNode[]

    constructor(value: IEventListenerNodeData, runManager: RunManager, nodes: GraphBaseNode[]) {
        super(value, runManager);
        this.nodes = nodes
    }

    invokeStep() {
        console.log('GraphEventListenerNode.invokeStep', this.getTriggerNodes)
    }

    get eventName() {
        return this.data.eventName;
    }

    get getTriggerNodes() {
        return this.nodes.filter(node => {
            if (node instanceof GraphEventTriggerNode) {
                return node.eventName === this.eventName
            }
            return false
        })
    }
}
