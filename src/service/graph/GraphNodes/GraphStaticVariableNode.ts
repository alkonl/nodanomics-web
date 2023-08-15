import {IStaticVariableNodeData} from "../../../interface";
import {GraphBaseNode} from "./abstracts";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphStaticVariableNode extends GraphBaseNode<IStaticVariableNodeData> {


    constructor(value: IStaticVariableNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }
}
