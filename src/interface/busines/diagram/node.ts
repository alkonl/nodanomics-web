import {IDiagramTextStyle} from "../font";
import {DiagramElementPreview, EElementType} from "./diagramElement";


export enum EDiagramNode {
    Source = 'Source',
    Drain = 'Drain',
    Pool = 'Pool',
    Gate = 'Gate',
}


export interface IBaseDiagramNode {
    elementType: EElementType.Node;
    type: EDiagramNode;
}




export interface IDiagramNodeStyle {
    borderWidth: number;
    borderColor: string;
    isFilled: boolean;
    fillColor?: string;
    textStyles: IDiagramTextStyle
}

export interface IDiagramNode extends IBaseDiagramNode {
    id: string;
    name: string;
    label: string;
    style: IDiagramNodeStyle;
    zIndex: number;
    preview: DiagramElementPreview;
}
