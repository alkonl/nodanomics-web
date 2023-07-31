import {GraphBaseNode} from "./abstracts";
import {IMicroLoopNodeData} from "../../../interface";
import {RunManager} from "../RunManager";

export class GraphMicroLoopNode extends GraphBaseNode<IMicroLoopNodeData>{
    constructor(value: IMicroLoopNodeData, runManager: RunManager) {
        super(value, runManager);
    }
}
