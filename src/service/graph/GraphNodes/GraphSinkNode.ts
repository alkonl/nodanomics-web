import {GraphInteractiveNode} from "./abstracts";
import {ISinkNodeData} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphSinkNode extends GraphInteractiveNode<ISinkNodeData> {
    constructor(data: ISinkNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(data, runManager, nodeManager);
    }

    protected runAction() {

    }
}
