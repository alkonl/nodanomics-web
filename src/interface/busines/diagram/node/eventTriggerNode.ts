import {EDiagramNode, IDiagramNodeBaseData} from "./structures";


export interface IEventTriggerNodeVariable {
    variableName: string
    value: number
}

export interface IEventTriggerNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.EventTrigger;
    eventName: string;
    eventCondition?: string;
    isEventConditionMet?: boolean;
    variables?: IEventTriggerNodeVariable[]
}
