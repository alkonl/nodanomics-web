import React from 'react';
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {EConnection, ISourceNodeData} from "../../../../interface";
import {NodeTextName} from "../styledComponent";
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
                <NodeTextName>
                    Source
                </NodeTextName>
                <NodeTextName>
                    trigger: {data.trigger.mode}
                </NodeTextName>
                <NodeTextName>
                    action: {data.actionMode}
                </NodeTextName>
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
