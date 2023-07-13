import {EDiagramNode, IDiagramNodeBaseData} from "./baseNode";
import {IResource} from "../resource";


export interface IPoolNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Pool
    resources: IResource[]
}

