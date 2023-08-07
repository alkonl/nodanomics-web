import {IDiagramNodeBaseData} from "./baseNode";
import {INodeLoopIncomingData, INumberVariable} from "../additional";

export interface ILoopNodeData extends IDiagramNodeBaseData {
    isLoopWasActive?: boolean;
    isLoopActive?: boolean;
    incomingVariables: INumberVariable[];
    // incomingData?: INodeLoopIncomingData;
}
