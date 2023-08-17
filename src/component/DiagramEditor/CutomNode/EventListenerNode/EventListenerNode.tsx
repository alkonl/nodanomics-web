import React from 'react';
import {Box, Input, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../../../constant";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {EConnection, IEventListenerNodeData} from "../../../../interface";
import {useUpdateNode} from "../../../../hooks";

export const EventListenerNode: React.FC<NodeProps<IEventListenerNodeData>> = ({isConnectable,data}) => {

    const {updateNodeData} = useUpdateNode({
        nodeId: data.id,
    })

    const onEventNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            eventName: event.target.value,
        })
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
                id={EConnection.ChainConnection}
                style={{
                    background: EColor.orange,
                }}
            />
            <Input
                onChange={onEventNameChange}
                placeholder="Insert event name"
                value={data.eventName || ''}
                size="small"
                sx={{
                    color: EFontColor.white,
                }}/>
            <Typography sx={{
                color: EColor.orange
            }}>
                {data.isEventTriggered && 'triggered'}
            </Typography>
        </Box>
    );
};
