import {IDiagramBaseInteractiveElementData} from "../../diagramElement";

export enum EDiagramNode {
    StaticVariable = 'StaticVariable',
    Source = 'Source',
    Formula = 'Formula',
    Pool = 'Pool',
    EventTrigger = 'EventTrigger',
    EventListener = 'EventListener',
}


export interface IDiagramNodeBaseData extends IDiagramBaseInteractiveElementData {
    type: EDiagramNode;
}
