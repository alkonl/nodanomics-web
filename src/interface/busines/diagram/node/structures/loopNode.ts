import {EDiagramNode, IDiagramNodeBaseData} from "./baseNode";
import {INumberVariable} from "../additional";

export interface ILoopNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.MicroLoop | EDiagramNode.WhileLoop,
    isLoopWasActive?: boolean;
    isLoopActive?: boolean;
    incomingVariables: INumberVariable[];
    outgoingVariables: INumberVariable[];
    children?: string[];
}
