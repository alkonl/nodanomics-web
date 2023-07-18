import {EDiagramNode, IDiagramNodeBaseData} from "./baseNode";
import {INodeWithTrigger} from "../nodeTrigger";
import {INodeWithAction} from "../nodeAction";
import {INodeDataWithInteractivity} from "./interectiveNode";


export interface ISourceNodeData extends INodeDataWithInteractivity {
    type: EDiagramNode.Source;
}
