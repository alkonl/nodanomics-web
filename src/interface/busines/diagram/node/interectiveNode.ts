import {IDiagramNodeBaseData} from "./baseNode";
import {INodeWithTrigger} from "../nodeTrigger";
import {INodeWithAction} from "../nodeAction";

export type INodeDataWithInteractivity = IDiagramNodeBaseData & INodeWithTrigger & INodeWithAction
