import {EDiagramNode, IDiagramNodeBaseData} from "./baseNode";
import {ENodeTrigger} from "../nodeTrigger";


export interface ISourceNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Source;
    triggerMode: ENodeTrigger;
}
