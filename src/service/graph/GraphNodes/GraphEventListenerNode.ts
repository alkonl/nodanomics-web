import {GraphBaseNode} from "./abstracts";
import {IEventListenerNodeData} from "../../../interface";
import {RunManager} from "../RunManager";

export class GraphEventListenerNode extends GraphBaseNode<IEventListenerNodeData>{
    constructor(value: IEventListenerNodeData, runManager: RunManager) {
        super(value, runManager);
    }
}
