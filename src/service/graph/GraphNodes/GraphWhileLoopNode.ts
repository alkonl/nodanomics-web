import {GraphInvokableNode} from "./abstracts";
import {IMicroLoopNodeData, IWhileLoopNodeData} from "../../../interface";
import {RunManager} from "../RunManager";

export class GraphWhileLoopNode extends GraphInvokableNode<IWhileLoopNodeData> {
    constructor(value: IWhileLoopNodeData, runManager: RunManager) {
        super(value, runManager)
    }

    invokeStep() {
        console.log('invokeStep')
    }
}
