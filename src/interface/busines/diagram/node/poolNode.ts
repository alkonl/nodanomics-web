import {EDiagramNode, IDiagramNodeBaseData} from "./baseNode";
import {IResource} from "../resource";
import {ENodeAction, INodeWithAction} from "../nodeAction";
import {INodeWithTrigger} from "../nodeTrigger";


export interface IPoolNodeData extends IDiagramNodeBaseData, INodeWithTrigger, INodeWithAction{
    type: EDiagramNode.Pool
    resources: IResource[]
}

