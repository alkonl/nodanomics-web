import {EDiagramNode, IDiagramNodeBaseData} from "./structures";
import {
    IIsShowInExecutionGraphNode,
    INodeDecimal,
    INodeHistory,
    INodeLoopIncomingData,
    INodeNumberVariable
} from "./additional";

export interface IFormulaResultBoolean {
    type: 'boolean'
    value: boolean
}

export interface IFormulaResultNumber {
    type: 'number'
    value: number
}

export type IFormulaResult = IFormulaResultBoolean | IFormulaResultNumber

export interface IFormulaNodeData extends
    IDiagramNodeBaseData, INodeNumberVariable,
    INodeDecimal, INodeHistory, IIsShowInExecutionGraphNode {
    type: EDiagramNode.Formula;
    formula?: string
    result?: IFormulaResult
    incomingData?: INodeLoopIncomingData
}
