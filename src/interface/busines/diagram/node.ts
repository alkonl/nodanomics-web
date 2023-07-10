import {IDiagramTextStyle} from "../font";
import {DiagramElementPreview} from "./diagramElement";
// eslint-disable-next-line import/named
import {Node} from "reactflow";

export enum EDiagramNode {
    Variable = 'Variable',
    // TODO change on actual node types below
    Drain = 'Drain',
    Pool = 'Pool',
    // Gate = 'Gate',
}



export interface IDiagramNodeStyle {
    borderWidth: number;
    borderColor: string;
    isFilled: boolean;
    fillColor?: string;
    textStyles: IDiagramTextStyle
}

export interface IDiagramNodeBaseData {
    id: string;
    name: string;
    label: string;
    style: IDiagramNodeStyle;
    preview: DiagramElementPreview;
}


export interface IVariableNodeData extends IDiagramNodeBaseData {
    value: string
}

export type INodeData = IVariableNodeData

export type INode = Node<INodeData>
