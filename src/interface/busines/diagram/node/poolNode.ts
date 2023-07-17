import {EDiagramNode, IDiagramNodeBaseData} from "./baseNode";
import {IResource} from "../resource";
import {ENodeAction} from "../nodeAction";


export interface IPoolNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Pool
    resources: IResource[]
    actionMode: ENodeAction
}

