import {IDiagramTextStyle} from "../font";
// eslint-disable-next-line import/named
import {Node} from "reactflow";

export enum EDiagramNode {
    Variable = 'Variable',
    D = 'D',
    S = 'S',
    F = 'F',
    UP = 'UP',
    DOWN = 'DOWN',
}


export interface IDiagramNodeStyle {
    borderWidth: number;
    borderColor: string;
    fillColor?: string;
    textStyles: IDiagramTextStyle
}

export interface IDiagramNodeBaseData {
    id: string;
    name: string;
    label: string;
    style: IDiagramNodeStyle;
}


export interface IVariableNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Variable;
    value: string
}

export type INodeData = IVariableNodeData

export type INode = Node<INodeData>
