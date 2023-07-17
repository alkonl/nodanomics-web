import {EDiagramNode, IDiagramNodeBaseData} from "./baseNode";
import {INodeWithTrigger} from "../nodeTrigger";
import {INodeWithAction} from "../nodeAction";


export interface ISourceNodeData extends IDiagramNodeBaseData, INodeWithTrigger, INodeWithAction {
    type: EDiagramNode.Source;
}
