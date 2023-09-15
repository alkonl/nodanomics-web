import {IDiagramBaseInteractiveElementData} from "../../diagramElement";
import {IResetBeforeStep} from "../../../graph";
import {IIsElementExecuted} from "../../generic";

export enum EDiagramNode {
    StaticVariable = 'StaticVariable',
    Origin = 'Source',
    Formula = 'Formula',
    // Variable it is DataNode
    Data = 'Variable',
    EventTrigger = 'EventTrigger',
    EventListener = 'EventListener',
    MicroLoop = 'MicroLoop',
    WhileLoop = 'WhileLoop',
    DatasetDatafield = 'DatasetDatafield',
    Start = 'Start',
    Sink = 'Sink',
    Transfer = 'Transfer',
}


export interface IDiagramNodeBaseData extends IDiagramBaseInteractiveElementData  {
    type: EDiagramNode;
    parentId?: string;
    isCollapsed: boolean;
    tag?: string;
    connectedNodes?: string[];
    defaultZIndex?: number;
}
