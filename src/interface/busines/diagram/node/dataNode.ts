import {EDiagramNode, IDiagramNodeBaseData} from "./structures";
import {IResource} from "../resource";
import {INodeWithAction} from "../nodeAction";
import {INodeWithTrigger} from "../nodeTrigger";
import {INodeDecimal, INodeHistory} from "./additional";


export interface IDataNodeData extends IDiagramNodeBaseData, INodeWithTrigger, INodeWithAction, INodeHistory, INodeDecimal {
    type: EDiagramNode.Data
    resources: IResource[]
    initialResources?: IResource[]
    resourcesToProvide: IResource[]
    isShowStep?: boolean
    step?: number
    roundingType?: string
    minCapacity?: number
    maxCapacity?: number
}

export const isIDataNodeData = (data: IDiagramNodeBaseData): data is IDataNodeData => {
    return data.type === EDiagramNode.Data
}
