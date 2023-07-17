import {GraphBaseNode} from "./GraphBaseNode";
import {IDiagramNodeBaseData, INodeWithAction, INodeWithTrigger} from "../../../interface";

type INodeDataWithTrigger = IDiagramNodeBaseData & INodeWithTrigger & INodeWithAction

export abstract class GraphInteractiveNode<IGenericNodeData extends INodeDataWithTrigger = INodeDataWithTrigger>
    extends GraphBaseNode<IGenericNodeData> {

    constructor(data: IGenericNodeData) {
        super(data);
    }

    abstract invokeStep(): void

    get triggerMode() {
        return this._data.triggerMode;
    }

    get actionMode() {
        return this._data.actionMode;
    }
}
