import React, {useEffect, useState} from 'react';
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {IMicroLoopNodeData} from "../../../../interface";
import {BaseNodeContainer} from "../container/BaseNodeContainer";
import {Box, Input} from "@mui/material";
import {NodeText} from "../styledComponent";
import {EColor, EFontColor} from "../../../../constant";
import {useUpdateNode} from "../../../../hooks";
import {EventHandle} from "../../CustomHandle/EventHandle";

export const MicroLoopNode: React.FC<NodeProps<IMicroLoopNodeData>> = (props) => {
    const {data} = props;

    const [loopCount, setLoopCount] = useState<number | undefined>(data.loopCount)
    const {updateNodeData} = useUpdateNode<IMicroLoopNodeData>({
        nodeId: data.id,
    })

    const onLoopCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoopCount(Number(event.target.value))
    }

    useEffect(() => {
        if (loopCount) {
            updateNodeData({loopCount})
        }
    }, [loopCount])

    return (
        <BaseNodeContainer node={props}>
            <Box
                sx={{
                    padding: 1,
                    boxSizing: 'border-box',
                    width: data.style.width,
                    height: data.style.height,
                    backgroundColor: EColor.darkPurple,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    gap: 3,
                }}>
                    <NodeText.Name type="header">
                        {data.name}
                    </NodeText.Name>
                    <Box sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'flex-end',
                    }}>
                        <NodeText.Name>
                            total:
                        </NodeText.Name>
                        <Input
                            onChange={onLoopCountChange}
                            value={loopCount}
                            sx={{
                                color: EFontColor.white,
                                width: 40,
                                height: 20,
                            }}/>

                    </Box>
                    <Box sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'flex-end',
                    }}>
                        <NodeText.Name>
                            current: {data.currentLoopCount}
                        </NodeText.Name>
                    </Box>
                </Box>
                <Box sx={{
                    position: 'relative',
                    flex: 1,
                }}>
                    <EventHandle
                        type="source"
                        position={Position.Right}
                    />
                </Box>
            </Box>
        </BaseNodeContainer>
    );
};
