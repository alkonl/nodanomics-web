import {IDiagramBaseInteractiveElementData} from "../../diagramElement";

export enum EDiagramNode {
    StaticVariable = 'StaticVariable',
    Source = 'Source',
    Formula = 'Formula',
    Variable = 'Variable',
    EventTrigger = 'EventTrigger',
    EventListener = 'EventListener',
    MicroLoop = 'MicroLoop',
    WhileLoop = 'WhileLoop',
}


export interface IDiagramNodeBaseData extends IDiagramBaseInteractiveElementData {
    type: EDiagramNode;
    parentId?: string;
    tag?: string;
}
