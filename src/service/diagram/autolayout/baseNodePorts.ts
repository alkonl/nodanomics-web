import {EDiagramNode, EPortSide} from "../../../interface";
import {ElkPort} from "elkjs/lib/elk-api";
import {createPorts} from "./createPorts";

export const baseNodePorts: { [key in EDiagramNode]?: ElkPort[] } = {
    [EDiagramNode.Origin]: createPorts([EPortSide.NORTH, EPortSide.WEST, EPortSide.EAST,]),
    [EDiagramNode.Data]: createPorts([EPortSide.WEST, EPortSide.EAST]),
    [EDiagramNode.Transfer]: createPorts([EPortSide.WEST, EPortSide.EAST]),
    [EDiagramNode.Sink]: createPorts([EPortSide.WEST, EPortSide.EAST, EPortSide.SOUTH]),
    [EDiagramNode.Formula]: createPorts([EPortSide.WEST, EPortSide.EAST, EPortSide.SOUTH, EPortSide.NORTH]),
    [EDiagramNode.DatasetDatafield]: createPorts([]),
    [EDiagramNode.EventTrigger]: createPorts([EPortSide.EAST]),
    [EDiagramNode.EventListener]: createPorts([EPortSide.WEST, EPortSide.EAST]),
    [EDiagramNode.MicroLoop]: createPorts([EPortSide.WEST, EPortSide.EAST]),
    [EDiagramNode.WhileLoop]: createPorts([EPortSide.WEST, EPortSide.EAST]),
}
