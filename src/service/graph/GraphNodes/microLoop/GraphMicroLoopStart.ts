import {GraphBaseNode} from "../abstracts";
import {IMicroLoopStartNodeData} from "../../../../interface";
import {RunManager} from "../../RunManager";

export class GraphMicroLoopStartNode extends GraphBaseNode<IMicroLoopStartNodeData> {
    constructor(value: IMicroLoopStartNodeData, runManager: RunManager) {
        super(value, runManager);
    }
}
