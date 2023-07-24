import React from 'react';
import {Box, Input} from "@mui/material";
import {EColor, EFontColor} from "../../../../constant";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {EConnection, IEventTriggerNodeData} from "../../../../interface";

export const EventTriggerNode: React.FC<NodeProps<IEventTriggerNodeData>> = ({isConnectable}) => {

    const onEventNameChange = () => {
//
    }

    const onConditionChange = () => {
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
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                id={EConnection.EventConnection}
                style={{
                    background: EColor.darkRed,
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
            <Input
                onChange={onConditionChange}
                placeholder="Condition"
                // value={data.formula || ''}
                size="small"
                sx={{
                    color: EFontColor.white,
                }}/>
        </Box>
    );
};
