import {EDiagramNode, IDiagramNodeBaseData} from "./structures";

export interface IEventListenerNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.EventListener;
    eventName: string;
}
