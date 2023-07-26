import {IStaticVariableNodeData} from "../../../interface";
import {GraphBaseNode} from "./abstracts";
import {RunManager} from "../RunManager";

export class GraphStaticVariableNode extends GraphBaseNode<IStaticVariableNodeData> {


    constructor(value: IStaticVariableNodeData, runManager: RunManager) {
        super(value, runManager);
    }
}
