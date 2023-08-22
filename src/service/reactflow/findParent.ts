import {IReactFlowNode, isINodeSize} from "../../interface";
import {isNodeCanBeParent} from "../../interface/busines/diagram/canBeParent";

export const findParent = (node: IReactFlowNode, nodes: IReactFlowNode[]) => {

    const candidates = nodes.filter((nds: IReactFlowNode) => {
        if (nds.id !== node.id && isNodeCanBeParent(nds.data.type) && isINodeSize(nds.data.style) && !nds.data.isCollapsed) {
            const ndsSize = {
                width: parseInt(nds.data.style.width?.toString() || "0"),
                height: parseInt(nds.data.style.height?.toString() || "0"),
            }
            const ndsPosition = {
                x: nds.positionAbsolute?.x || nds.position.x,
                y: nds.positionAbsolute?.y || nds.position.y,
            }
            const isPosX = ndsPosition.x <= node.position.x
            const isPosX2 = ndsPosition.x + ndsSize.width >=
                node.position.x
            const isPosY = ndsPosition.y <= node.position.y
            const isPosY2 = ndsPosition.y + ndsSize.height >=
                node.position.y
            return (isPosX &&
                isPosX2 &&
                isPosY &&
                isPosY2)
        }
    });
    console.log('candidates', candidates.map((c) => c.data.name))
    // find the most top parent
    const topParent = candidates.reduce((prev, current) => {
        if (prev.id === current.parentNode) {
            return current
        }
        return prev
    }, candidates[0])
    console.log('topParent', topParent?.data.name)
    return topParent
    // return nodes.find((nds: IReactFlowNode) => {
    //     if (nds.id !== node.id && isNodeCanBeParent(nds.data.type) && isINodeSize(nds.data.style)) {
    //         const ndsSize = {
    //             width: nds.data.style.width,
    //             height: nds.data.style.height
    //         }
    //         if (
    //             nds.position.x <= node.position.x &&
    //             nds.position.x + parseInt(ndsSize.width?.toString() || "0") >=
    //             node.position.x &&
    //             nds.position.y <= node.position.y &&
    //             nds.position.y + parseInt(ndsSize.height?.toString() || "0") >=
    //             node.position.y
    //         ) {
    //             return nds
    //         }
    //     }
    // });
}
