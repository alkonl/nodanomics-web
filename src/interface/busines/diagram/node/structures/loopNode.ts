import {IDiagramNodeBaseData} from "./baseNode";

export interface ILoopNodeData extends IDiagramNodeBaseData {
    isLoopWasActive?: boolean;
    isLoopActive?: boolean;
}
