import {EDiagramNode, IDiagramNodeBaseData} from "./structures";
import {INodeNumberVariable} from "./additional";
import {IIsElementExecuted} from "../generic";


export interface IEventTriggerNodeVariable {
    variableName: string
    value: number
}

export interface IEventTriggerNodeData extends IDiagramNodeBaseData, INodeNumberVariable, IIsElementExecuted {
    type: EDiagramNode.EventTrigger;
    eventName: string;
    // eventCondition?: string;
    // isEventConditionMet?: boolean;
}
