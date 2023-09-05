import {GraphInvokableNode} from "./abstracts";
import {IStartNodeData} from "../../../interface";
import {GraphNodeManager} from "../NodeManager";
import {RunManager} from "../RunManager";

export class GraphStartNode extends GraphInvokableNode<IStartNodeData> {

    constructor(value: IStartNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }
}
