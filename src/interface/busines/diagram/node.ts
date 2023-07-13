// eslint-disable-next-line import/named
import {Node} from "reactflow";
import {IDiagramBaseInteractiveElementData} from "./diagramElement";

export enum EDiagramNode {
    Variable = 'Variable',
    D = 'D',
    Source = 'Source',
    Formula = 'Formula',
    Pool = 'Pool',
    DOWN = 'DOWN',
    ConnectionNode = 'ConnectionNode',
}



export interface IDiagramNodeBaseData extends IDiagramBaseInteractiveElementData{
    type: EDiagramNode;
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

export interface IResource {
    id: string
    color: string
}

export interface ISourceNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Source;
}

export interface IPoolNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Pool
    resources: IResource[]
}


export type INodeData = IVariableNodeData | IFormulaNodeData | ISourceNodeData | IPoolNodeData

export type IReactFlowNode = Node<INodeData>


