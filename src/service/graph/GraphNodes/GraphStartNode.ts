import {GraphBaseNode} from "./abstracts";
import {IStartNodeData} from "../../../interface";
import {GraphNodeManager} from "../NodeManager";
import {RunManager} from "../RunManager";

export class GraphStartNode extends GraphBaseNode<IStartNodeData>  {

    constructor(value: IStartNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }
}
