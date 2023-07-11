import {IDiagramTextStyle} from "../font";
// eslint-disable-next-line import/named
import {Node} from "reactflow";

export enum EDiagramNode {
    Variable = 'Variable',
    D = 'D',
    S = 'S',
    Formula = 'Formula',
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
    type: EDiagramNode;
    id: string;
    name: string;
    label: string;
    style: IDiagramNodeStyle;
}


export interface IVariableNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Variable;
    value?: number
}

export interface IFormulaNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Formula;
    formula?: string
}

export type INodeData = IFormulaNodeData | IVariableNodeData

export type INode = Node<INodeData>
