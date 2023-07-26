import React from 'react';
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {EConnection, ISourceNodeData} from "../../../../interface";
import {NodeText} from "../styledComponent";
import {InteractiveNodeContainer} from "../container";
import {EColor} from "../../../../constant";

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
            <Handle type="source" position={Position.Right} id={EConnection.DataConnection} isConnectable={isConnectable}/>
            <Handle
                type="target"
                position={Position.Left}
                id={EConnection.EventConnection}
                isConnectable={isConnectable}
                style={{
                    background: EColor.orange,
                }}
            />
        </InteractiveNodeContainer>
    );
};
