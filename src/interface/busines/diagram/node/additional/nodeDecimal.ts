import {EDiagramNode, IDiagramNodeBaseData} from "../structures";

export interface INodeDecimal {
    isShowDecimal?: boolean
    decimalDigits?: number
}

export const isNodeHasIDecimal = (obj: IDiagramNodeBaseData): obj is (IDiagramNodeBaseData & INodeDecimal) => {
    return obj.type === EDiagramNode.Formula || obj.type === EDiagramNode.Data
}
