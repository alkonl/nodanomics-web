import {EDiagramNode, IDiagramNodeBaseData} from "./structures";
import {IResource} from "../resource";
import {INodeWithAction} from "../nodeAction";
import {INodeWithTrigger} from "../nodeTrigger";


export interface IVariableNodeData extends IDiagramNodeBaseData, INodeWithTrigger, INodeWithAction {
    type: EDiagramNode.Variable
    resources: IResource[]
}

