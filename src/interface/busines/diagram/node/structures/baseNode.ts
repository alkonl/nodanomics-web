import {IDiagramBaseInteractiveElementData} from "../../diagramElement";


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
    Label = 'Label',
}

export type IConnectedNodeInfo = {
    id: string;
    label: string;
}

export interface IDiagramNodeBaseData extends IDiagramBaseInteractiveElementData  {
    type: EDiagramNode;
    parentId?: string;
    isCollapsed: boolean;
    tag?: string;
    connectedNodes?: IConnectedNodeInfo[];
    defaultZIndex?: number;
    layerId: string;
}
