import {GraphBaseNode} from "./abstracts";
import {ILabelNodeData} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphLabelNode extends GraphBaseNode<ILabelNodeData> {
    constructor(data: ILabelNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(data, runManager, nodeManager);
    }

}
