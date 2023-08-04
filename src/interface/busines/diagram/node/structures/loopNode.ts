import {IDiagramNodeBaseData} from "./baseNode";
import {INodeLoopIncomingData} from "../additional";

export interface ILoopNodeData extends IDiagramNodeBaseData {
    isLoopWasActive?: boolean;
    isLoopActive?: boolean;
    incomingData?: INodeLoopIncomingData;
}
