import {EDiagramNode, IReactFlowNode} from "../../../interface";
import {ElkPort} from "elkjs/lib/elk-api";
import {baseNodePorts} from "./baseNodePorts";

export const getPorts = (node: IReactFlowNode): ElkPort[] => {
    const basePorts = baseNodePorts[node.data.type] || baseNodePorts[EDiagramNode.Origin]
    if (basePorts) {
        return basePorts.map((port) => ({
            ...port,
            id: `${node.id}/${port.id}`
        }))
    }
    return []
}
