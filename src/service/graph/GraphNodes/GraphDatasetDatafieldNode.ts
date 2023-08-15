import {GraphInvokableNode} from "./abstracts";
import {IDatasetDatafield} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";


export class GraphDatasetDatafieldNode extends GraphInvokableNode<IDatasetDatafield> {

    constructor(value: IDatasetDatafield, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }


    invokeStep() {
        console.info("GraphEventListenerNode.invokeStep()");
    }

}
