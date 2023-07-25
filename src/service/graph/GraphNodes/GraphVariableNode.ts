import {IVariableNodeData} from "../../../interface";
import {GraphBaseNode} from "./abstracts";
import {RunManager} from "../RunManager";

export class GraphVariableNode extends GraphBaseNode<IVariableNodeData> {
    constructor(value: IVariableNodeData, runManager: RunManager) {
        super(value, runManager);
    }
}
