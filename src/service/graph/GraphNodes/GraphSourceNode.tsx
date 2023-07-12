import {GraphBaseNode} from "./GraphBaseNode";
import {ISourceNodeData} from "../../../interface";

export class GraphSourceNode extends GraphBaseNode<ISourceNodeData> {
    constructor(data: ISourceNodeData) {
        super(data);
    }

    onParentUpdate() {
        //
    }
}
