import React from 'react';
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {Box} from "@mui/material";
import {EConnection, IVariableNodeData} from "../../../../interface";
import {NodeText} from "../styledComponent";

export const VariableNode: React.FC<NodeProps<IVariableNodeData>> = ({isConnectable, data}) => {

    return (
        <Box>
            <Handle type="target" position={Position.Left} id={EConnection.DataConnection}
                    isConnectable={isConnectable}/>
            <Handle type="source" position={Position.Right} id={EConnection.DataConnection}
                    isConnectable={isConnectable}/>
            <Box sx={{
                border: '1px solid #777',
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <NodeText>
                    Variable Node
                </NodeText>
                <NodeText>
                    trigger: {data?.trigger.mode}
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
