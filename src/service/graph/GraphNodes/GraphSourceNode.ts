import {GraphBaseNode} from "./GraphBaseNode";
import {ISourceNodeData} from "../../../interface";

export class GraphSourceNode extends GraphBaseNode<ISourceNodeData> {
    constructor(data: ISourceNodeData) {
        super(data);
    }

    invoke() {
        this.invokeOutgoingEdges()
        console.log('invokes GraphSourceNode')
    }

    onParentUpdate() {
        //
    }

    onEdgeInvoke() {
        //
    }
}
