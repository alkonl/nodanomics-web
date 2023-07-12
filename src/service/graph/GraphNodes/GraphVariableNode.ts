import {IVariableNodeData} from "../../../interface";
import {GraphBaseNode} from "./GraphBaseNode";

export class GraphVariableNode extends GraphBaseNode<IVariableNodeData> {
    constructor(value: IVariableNodeData) {
        super(value);
    }

    onParentUpdate() {
        // this.updateOutgoingNodes();
    }
}
