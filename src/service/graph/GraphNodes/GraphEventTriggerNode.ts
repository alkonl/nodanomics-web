import {GraphBaseNode} from "./abstracts";
import {IEventTriggerNodeData} from "../../../interface";
import {RunManager} from "../RunManager";

export class GraphEventTriggerNode extends GraphBaseNode<IEventTriggerNodeData>{
    constructor(value: IEventTriggerNodeData, runManager: RunManager) {
        super(value, runManager);
    }
}
