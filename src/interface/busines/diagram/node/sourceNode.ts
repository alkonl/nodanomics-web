import {EDiagramNode, INodeDataWithInteractivity} from "./structures";


export interface ISourceNodeData extends INodeDataWithInteractivity {
    type: EDiagramNode.Source;
}
