import React from 'react';
import {Box, Input} from "@mui/material";
import {EColor, EFontColor} from "../../../../constant";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {EConnection, IEventListenerNodeData} from "../../../../interface";

export const EventListenerNode: React.FC<NodeProps<IEventListenerNodeData>> = ({isConnectable}) => {

    const onEventNameChange = () => {
//
    }

    return (
        <Box
            sx={{
                width: 200,
                padding: 1,
                borderRadius: 2,
                backgroundColor: EColor.black,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                id={EConnection.EventConnection}
                style={{
                    background: EColor.orange,
                }}
            />
            <Input
                onChange={onEventNameChange}
                placeholder="Insert event name"
                // value={data.formula || ''}
                size="small"
                sx={{
                    color: EFontColor.white,
                }}/>
        </Box>
    );
};
