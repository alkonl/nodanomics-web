import {EDiagramNode, IDiagramNodeBaseData} from "./structures";
import {IResource} from "../resource";
import {INodeWithAction} from "../nodeAction";
import {INodeWithTrigger} from "../nodeTrigger";


export interface IDataNodeData extends IDiagramNodeBaseData, INodeWithTrigger, INodeWithAction {
    type: EDiagramNode.Data
    resources: IResource[]
    initialResources?: IResource[]
    minCapacity?: number
    maxCapacity?: number
    minResources?: number
    maxResources?: number
    resourcesCountHistory?: number[]
}

