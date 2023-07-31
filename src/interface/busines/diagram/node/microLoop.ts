import {EDiagramNode} from "./structures";
import {IDiagramBaseInteractiveElementData} from "../diagramElement";
import {IDiagramNodeStyle} from "../elementStyle";

export interface IMicroLoopNodeDataStyle extends IDiagramNodeStyle {
    width: number;
    height: number;
}

export interface IMicroLoopNodeData extends IDiagramBaseInteractiveElementData {
    type: EDiagramNode.MicroLoop;
    loopCount?: number;
    style: IMicroLoopNodeDataStyle;
}
