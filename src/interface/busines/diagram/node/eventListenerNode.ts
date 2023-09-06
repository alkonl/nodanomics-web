import {EDiagramNode, IInvokableNode} from "./structures";

export interface IEventListenerNodeData extends IInvokableNode{
    type: EDiagramNode.EventListener;
    eventName?: string;
    isEventTriggered?: boolean;
}
