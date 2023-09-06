import {EDiagramNode, IDiagramNodeBaseData, IInvokableNode} from "./structures";
import {
    IIsNodeAutomatic,
    IIsShowInExecutionGraphNode,
    INodeDecimal,
    INodeHistory,
    INodeLoopIncomingData,
    INodeNumberVariable
} from "./additional";
import {IIsElementExecuted} from "../generic";

export interface IFormulaResultBoolean {
    type: 'boolean'
    value: boolean
}

export interface IFormulaResultNumber {
    type: 'number'
    value: number
}

export type IFormulaResult = IFormulaResultBoolean | IFormulaResultNumber

export interface IFormulaNodeData extends IInvokableNode, INodeNumberVariable,
    INodeDecimal, INodeHistory, IIsShowInExecutionGraphNode,
    IIsNodeAutomatic, IIsElementExecuted {
    type: EDiagramNode.Formula;
    formula?: string
    result?: IFormulaResult
    incomingData?: INodeLoopIncomingData
}
