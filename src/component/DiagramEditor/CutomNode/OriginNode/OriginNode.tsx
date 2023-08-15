import React from 'react';
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {EConnection, IOriginNodeData} from "../../../../interface";
import {NodeTextName} from "../styledComponent";
import {InteractiveNodeContainer} from "../container";
import {EColor} from "../../../../constant";
import {BaseNodeContainer} from "../container/BaseNodeContainer";

export const OriginNode: React.FC<NodeProps<IOriginNodeData>> = (props) => {
    const {isConnectable, data} = props
    return (
        <InteractiveNodeContainer data={data}>
            <BaseNodeContainer node={props}>
            <Box sx={{
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <NodeTextName>
                    Origin
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
            </BaseNodeContainer>
        </InteractiveNodeContainer>
    );
};
