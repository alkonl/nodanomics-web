import {EDiagramNode, INodeDataWithInteractivity} from "./structures";
import {IIsElementExecuted} from "../generic";


export interface IOriginNodeData extends INodeDataWithInteractivity, IIsElementExecuted {
    type: EDiagramNode.Origin;
}
