import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {EColor, EFontColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {EConnection, IEventTriggerNodeData} from "../../../../interface";
import {useUpdateNode} from "../../../../hooks";
import {NodeStyle} from "../styledComponent";

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
                width: GAP_BETWEEN_EDITOR_CANVAS_DOTS * 6,
                height: GAP_BETWEEN_EDITOR_CANVAS_DOTS * 3,
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 1,
                borderRadius: '14% 14% 14% 14%/28% 28% 28% 28%',
                borderWidth: 3,
                borderColor: data.style.borderColor,
                backgroundColor: EColor.black,
                borderStyle: 'solid',
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
            <NodeStyle.Input
                onChange={onEventNameChange}
                placeholder="Insert event name"
                value={eventName}
                size="small"
                sx={{
                    // height:' 0.7em',
                    // padding: 0,
                    // color: EFontColor.white,
                }}/>
            <NodeStyle.Input
                onChange={onConditionChange}
                placeholder="Condition"
                value={eventCondition}
                size="small"
                sx={{
                    // // height:' 0.7em',
                    // padding: 0,
                    // color: EFontColor.white,
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
