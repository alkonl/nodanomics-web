import {EDiagramNode, IDiagramNodeBaseData} from "./structures";
import {IResource} from "../resource";
import {INodeWithAction} from "../nodeAction";
import {INodeWithTrigger} from "../nodeTrigger";


export interface IPoolNodeData extends IDiagramNodeBaseData, INodeWithTrigger, INodeWithAction {
    type: EDiagramNode.Pool
    resources: IResource[]
}

