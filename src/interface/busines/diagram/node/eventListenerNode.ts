import {EDiagramNode, IDiagramNodeBaseData} from "./structures";
import {IIsElementExecuted} from "../generic";

export interface IEventListenerNodeData extends IDiagramNodeBaseData, IIsElementExecuted {
    type: EDiagramNode.EventListener;
    eventName?: string;
    isEventTriggered?: boolean;
}
