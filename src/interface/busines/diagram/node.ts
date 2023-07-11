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

export interface IFormulaResultBoolean {
    type: 'boolean'
    value: boolean
}

export interface IFormulaResultNumber {
    type: 'number'
    value: number
}

export type IFormulaResult = IFormulaResultBoolean | IFormulaResultNumber

export interface IFormulaNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Formula;
    formula?: string
    result?: IFormulaResult
}

export type INodeData = IFormulaNodeData | IVariableNodeData

// export type IRFormula = Node<IFormulaNodeData>
//
// export type IRVariable = Node<IVariableNodeData>

// export type IReactFlowNode = IRFormula | IRVariable
export type IReactFlowNode = Node<INodeData>

