import {EDiagramNode, IReactFlowNode, isINodeSize} from "../../interface";
import {isNodeCanBeParent} from "../../interface/busines/diagram/canBeParent";

export const findParent = (node: IReactFlowNode, nodes: IReactFlowNode[]) => {
    if (isNodeCanBeParent(node.data.type)) {
        return undefined
    }
    return nodes.find((nds: IReactFlowNode) => {

        if (isNodeCanBeParent(nds.data.type) && isINodeSize(nds.data.style)) {
            const ndsSize = {
                width: nds.data.style.width,
                height: nds.data.style.height
            }
            if (
                nds.position.x <= node.position.x &&
                nds.position.x + parseInt(ndsSize.width?.toString() || "0") >=
                node.position.x &&
                nds.position.y <= node.position.y &&
                nds.position.y + parseInt(ndsSize.height?.toString() || "0") >=
                node.position.y
            ) {
                return nds
            }
        }
    });
}
