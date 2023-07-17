import React from 'react';
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {Box} from "@mui/material";
import {IPoolNodeData} from "../../../../interface";
import {NodeText} from "../styledComponent";

export const PoolNode: React.FC<NodeProps<IPoolNodeData>> = ({isConnectable, data}) => {
    return (
        <Box>
            <Handle type="target" position={Position.Left} isConnectable={isConnectable}/>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable}/>
            <Box sx={{
                border: '1px solid #777',
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <NodeText>
                    Pool
                </NodeText>
                <NodeText>
                    trigger: {data.trigger.mode}
                </NodeText>
                <NodeText>
                    action: {data.actionMode}
                </NodeText>
                <NodeText>
                    resources: {data.resources.length}
                </NodeText>
            </Box>

        </Box>
    );
};
