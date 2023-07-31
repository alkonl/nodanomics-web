import {EDiagramNode, ICreatedCompoundNode, ICreatedNode} from "../../../interface";
import {createBaseNode} from "./createBaseNode";
import {loopSize} from "../../../constant";
import {addAdditionalData} from "./addAdditionalData";

const compoundNodeTypes = [EDiagramNode.MicroLoop]

export const createNode = ({type, position}: {
    type: EDiagramNode,
    position: { x: number, y: number }
}): ICreatedNode | ICreatedCompoundNode => {
    if (compoundNodeTypes.includes(type)) {
        const loopNode = createBaseNode({type: EDiagramNode.MicroLoop, position: position})
        const startNodeBase = createBaseNode({
            type: EDiagramNode.MicroLoopStartNode, position: {
                x: 10,
                y: loopSize.minHeight / 2
            },
        })
        const startNode = addAdditionalData({
            node: startNodeBase, addition: {
                parentNode: loopNode.id,
                extent: 'parent',
                dragHandle: '.custom-drag-handle-no-drag',
            }
        })
        return {
            type: 'compound',
            nodes: [loopNode, startNode]
        }
    }
    return {
        type: 'node',
        node: createBaseNode({type, position})
    }
}
