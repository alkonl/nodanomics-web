import {IDiagramBaseInteractiveElementData} from "../../diagramElement";

export enum EDiagramNode {
    StaticVariable = 'StaticVariable',
    Source = 'Source',
    Formula = 'Formula',
    // Variable it is DataNode
    Data = 'Variable',
    EventTrigger = 'EventTrigger',
    EventListener = 'EventListener',
    MicroLoop = 'MicroLoop',
    WhileLoop = 'WhileLoop',
    DatasetDatafield = 'DatasetDatafield',
}


export interface IDiagramNodeBaseData extends IDiagramBaseInteractiveElementData {
    type: EDiagramNode;
    parentId?: string;
    isCollapsed?: boolean;
    tag?: string;
}
