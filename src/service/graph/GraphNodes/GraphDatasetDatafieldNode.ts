import {GraphInvokableNode} from "./abstracts";
import {IDatasetDatafield} from "../../../interface";
import {RunManager} from "../RunManager";


export class GraphDatasetDatafieldNode extends GraphInvokableNode<IDatasetDatafield> {

    constructor(value: IDatasetDatafield, runManager: RunManager) {
        super(value, runManager);
    }


    invokeStep() {
        console.log("GraphEventListenerNode.invokeStep()");
    }

}
