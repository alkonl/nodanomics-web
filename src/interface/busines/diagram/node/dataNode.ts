import {EDiagramNode, IDiagramNodeBaseData} from "./structures";
import {IResource} from "../resource";
import {INodeWithAction} from "../nodeAction";
import {INodeWithTrigger} from "../nodeTrigger";


export interface IDataNodeData extends IDiagramNodeBaseData, INodeWithTrigger, INodeWithAction {
    type: EDiagramNode.Data
    resources: IResource[]
    initialResources?: IResource[]
    isShowStep?: boolean
    step?: number
    isShowDecimal?: boolean
    decimalDigits?: number
    minCapacity?: number
    maxCapacity?: number
    minResources?: number
    maxResources?: number
    resourcesCountHistory?: number[]
}

export const isIDataNodeData = (data: IDiagramNodeBaseData): data is IDataNodeData => {
    return data.type === EDiagramNode.Data
}
