import {EDiagramNode, IDiagramNodeBaseData} from "./structures";
import {INodeNumberVariable} from "./additional";


export interface IEventTriggerNodeVariable {
    variableName: string
    value: number
}

export interface IEventTriggerNodeData extends IDiagramNodeBaseData, INodeNumberVariable {
    type: EDiagramNode.EventTrigger;
    eventName: string;
    // eventCondition?: string;
    // isEventConditionMet?: boolean;
}
