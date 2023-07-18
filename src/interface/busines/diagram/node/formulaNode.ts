import {EDiagramNode, IDiagramNodeBaseData} from "./baseNode";

export interface IFormulaResultBoolean {
    type: 'boolean'
    value: boolean
}

export interface IFormulaResultNumber {
    type: 'number'
    value: number
}

export type IFormulaResult = IFormulaResultBoolean | IFormulaResultNumber


export interface IFormulaNodeVariable  {
    variableName: string
    value: number
}

export interface IFormulaNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Formula;
    formula?: string
    variables?: IFormulaNodeVariable[]
    result?: IFormulaResult
}
