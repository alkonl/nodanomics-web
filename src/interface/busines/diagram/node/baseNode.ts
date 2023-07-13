import {IDiagramBaseInteractiveElementData} from "../diagramElement";

export enum EDiagramNode {
    Variable = 'Variable',
    D = 'D',
    Source = 'Source',
    Formula = 'Formula',
    Pool = 'Pool',
    DOWN = 'DOWN',
    ConnectionNode = 'ConnectionNode',
}


export interface IDiagramNodeBaseData extends IDiagramBaseInteractiveElementData {
    type: EDiagramNode;
}
