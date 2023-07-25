import React, {useEffect, useState} from 'react';
import {Box, Input, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../../../constant";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {EConnection, IEventTriggerNodeData} from "../../../../interface";
import {useUpdateNode} from "../../../../hooks";

export const EventTriggerNode: React.FC<NodeProps<IEventTriggerNodeData>> = ({isConnectable, data}) => {

    const [eventName, setEventName] = useState<string>(data.eventName)
    const [eventCondition, setEventCondition] = useState<string>(data.eventCondition || '')

    const {updateNodeData} = useUpdateNode({
        nodeId: data.id,
    })


    useEffect(() => {
        updateNodeData({eventName})
    }, [eventName])

    useEffect(() => {
        updateNodeData({eventCondition})
    }, [eventCondition])

    const onEventNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(event.target.value)
    }

    const onConditionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEventCondition(event.target.value)
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
                id={EConnection.LogicConnection}
                style={{
                    background: EColor.darkRed,
                }}
            />
            <Input
                onChange={onEventNameChange}
                placeholder="Insert event name"
                value={eventName}
                size="small"
                sx={{
                    color: EFontColor.white,
                }}/>
            <Input
                onChange={onConditionChange}
                placeholder="Condition"
                value={eventCondition}
                size="small"
                sx={{
                    color: EFontColor.white,
                }}/>
            <Typography sx={{
                color: EColor.orange
            }}>
                {data.isEventConditionMet && 'condition met'}
            </Typography>
            <Box sx={{
                color: EFontColor.white,
                display: 'flex',
            }}>
                vars: {data.variables?.map((variable, index) => (
                <Typography
                    sx={{
                        color: EFontColor.white,
                    }}
                    key={index}>
                    {variable.variableName} = {variable.value}
                </Typography>
            ))}
            </Box>
        </Box>
    )
}
