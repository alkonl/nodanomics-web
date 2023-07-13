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

export interface IFormulaNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Formula;
    formula?: string
    result?: IFormulaResult
}
