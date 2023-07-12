import {GraphBaseNode} from "./GraphBaseNode";
import {IPoolNodeData} from "../../../interface";

export class GraphPoolNode extends GraphBaseNode<IPoolNodeData> {
    constructor(data: IPoolNodeData) {
        super(data);
    }

    onParentUpdate() {
        //
    }
}
