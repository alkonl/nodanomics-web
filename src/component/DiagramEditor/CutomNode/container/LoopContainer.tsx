import React from "react";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {INodeData} from "../../../../interface";
import {useUpdatePosAbsolute} from "../../../../hooks";
import {BaseNodeContainer} from "./BaseNodeContainer";

export const LoopContainer: React.FC<{
    children: React.ReactNode
    node: NodeProps<INodeData>
}> = ({
          children,
          node
      }) => {
    useUpdatePosAbsolute({
        nodeId: node.id,
        xPos: node.xPos,
        yPos: node.yPos
    })
    return (
        <BaseNodeContainer node={node}>
            {children}
        </BaseNodeContainer>
    )
};
