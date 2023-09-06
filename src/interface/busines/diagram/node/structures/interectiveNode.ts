import {INodeWithTrigger} from "../../nodeTrigger";
import {INodeWithAction} from "../../nodeAction";
import {IInvokableNode} from "./invokableNode";

export type INodeDataWithInteractivity = IInvokableNode & INodeWithTrigger & INodeWithAction
