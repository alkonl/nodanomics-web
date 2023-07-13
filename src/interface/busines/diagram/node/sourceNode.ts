import {EDiagramNode, IDiagramNodeBaseData} from "./baseNode";


export interface ISourceNodeData extends IDiagramNodeBaseData {
    type: EDiagramNode.Source;
}
