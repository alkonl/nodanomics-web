import {GraphInvokableNode} from "./abstracts";
import {ITransferNodeData} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphTransferNode extends GraphInvokableNode<ITransferNodeData> {

    constructor(value: ITransferNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }

}
