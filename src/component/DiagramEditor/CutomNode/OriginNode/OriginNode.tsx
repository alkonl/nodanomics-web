import React from 'react';
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {EConnection, IOriginNodeData} from "../../../../interface";
import {NodeTextName} from "../styledComponent";
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {BaseNodeShapeContainer} from "../container";

const SIZE = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 4
const clipPath = 'polygon(50% 0%, 100% 50%, 100% 100%, 0 100%, 0 50%)'

export const OriginNode: React.FC<NodeProps<IOriginNodeData>> = (props) => {
    const {isConnectable, data} = props
    return (
        <>
            <BaseNodeShapeContainer
                params={{
                    width: SIZE,
                    height: SIZE,
                    clipPath: clipPath,
                }}
                node={props}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    // flexDirection: 'column',
                    justifyContent: 'center',
                    clipPath: clipPath,
                    background: EColor.black,
                }}>
                    <NodeTextName sx={{
                        position: 'absolute',
                        bottom: GAP_BETWEEN_EDITOR_CANVAS_DOTS * 1.25,
                    }}>
                        {data.name}
                    </NodeTextName>
                </Box>
            </BaseNodeShapeContainer>
            <Handle type="source" position={Position.Right} id={EConnection.DataConnection}
                    isConnectable={isConnectable}/>
            <Handle
                type="target"
                position={Position.Left}
                id={EConnection.EventConnection}
                isConnectable={isConnectable}
                style={{
                    background: EColor.orange,
                }}
            />

        </>
    );
};
