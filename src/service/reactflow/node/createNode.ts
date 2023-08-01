import {
    ECreatedNodeType,
    EDiagramNode, ICreatedNode,
} from "../../../interface";
import {createBaseNode} from "./createBaseNode";
import {loopSize} from "../../../constant";
import {addAdditionalReactFlowData} from "./addAdditionalReactFlowData";

const compoundNodeTypes = [EDiagramNode.MicroLoop]

export const createNode = ({type, position}: {
    type: EDiagramNode,
    position: { x: number, y: number }
}): ICreatedNode => {
    if (compoundNodeTypes.includes(type)) {
        const microLoopNodeData = createBaseNode({type: EDiagramNode.MicroLoop, position: position})
        const startNodeBase = createBaseNode({
            type: EDiagramNode.MicroLoopStartNode, position: {
                x: 10,
                y: loopSize.minHeight / 2
            },
            additionalData: {
                type: EDiagramNode.MicroLoopStartNode,
                parentId: microLoopNodeData.id,
            }
        })
        const startLoopNodeData = addAdditionalReactFlowData({
            node: startNodeBase, addition: {
                parentNode: microLoopNodeData.id,
                extent: 'parent',
                dragHandle: '.custom-drag-handle-no-drag',
            }
        })
        return {
            type: ECreatedNodeType.MicroLoop,
            nodes: {
                microLoopNodeData: microLoopNodeData,
                startLoopNodeData: startLoopNodeData,
            }
        }
    }
    return {
        type: ECreatedNodeType.Simple,
        node: createBaseNode({type, position}),
    }
}
