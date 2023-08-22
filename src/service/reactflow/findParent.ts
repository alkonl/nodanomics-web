import {IReactFlowNode, isINodeSize} from "../../interface";
import {isNodeCanBeParent} from "../../interface/busines/diagram/canBeParent";

export const findParent = (node: IReactFlowNode, nodes: IReactFlowNode[]) => {

    const candidates = nodes.filter((nds: IReactFlowNode) => {
        if (nds.id !== node.id && isNodeCanBeParent(nds.data.type) && isINodeSize(nds.data.style)) {
            const ndsSize = {
                width: nds.data.style.width,
                height: nds.data.style.height
            }
            const ndsPosition = {
                x: nds.positionAbsolute?.x || nds.position.x,
                y: nds.positionAbsolute?.y || nds.position.y,
            }
            if (
                nds.position.x <= node.position.x &&
                ndsPosition.x + parseInt(ndsSize.width?.toString() || "0") >=
                node.position.x &&
                ndsPosition.y <= node.position.y &&
                ndsPosition.y + parseInt(ndsSize.height?.toString() || "0") >=
                node.position.y
            ) {
                return nds
            }
        }
    });
    console.log('candidates', candidates, nodes)
    return nodes.find((nds: IReactFlowNode) => {
        if (nds.id !== node.id&& isNodeCanBeParent(nds.data.type) && isINodeSize(nds.data.style)) {
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
