import {IDiagramNodeBaseData} from "./baseNode";
import {INumberVariable} from "../additional";

export interface ILoopNodeData extends IDiagramNodeBaseData {
    isLoopWasActive?: boolean;
    isLoopActive?: boolean;
    incomingVariables: INumberVariable[];
    outgoingVariables: INumberVariable[];
}
