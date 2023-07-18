import React from 'react';
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {ISourceNodeData} from "../../../../interface";
import {NodeText} from "../styledComponent";
import {InteractiveNodeContainer} from "../container";

export const SourceNode: React.FC<NodeProps<ISourceNodeData>> = ({isConnectable, data}) => {
    return (
        <InteractiveNodeContainer data={data}>
            <Box sx={{
                border: '1px solid #777',
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <NodeText>
                    Source
                </NodeText>
                <NodeText>
                    trigger: {data.trigger.mode}
                </NodeText>
                <NodeText>
                    action: {data.actionMode}
                </NodeText>
            </Box>
            <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable}/>
        </InteractiveNodeContainer>
    );
};
