import React from 'react';
import {Box} from "@mui/material";
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {EConnectionMode, IEventListenerNodeData} from "../../../../interface";
import {NodeStyle} from "../styledComponent";
import {ChainHandle} from "../../CustomHandle/ChainHandle";

export const EventListenerNode: React.FC<NodeProps<IEventListenerNodeData>> = ({isConnectable, data}) => {

    return (
        <>
            <Box sx={{
                position: 'absolute',
                width: 'calc(100% + 30px)',
                height: '100%',
                left: -15,
                display: 'flex',
                flexDirection: 'row-reverse',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 1,
                    pointerEvents: 'none',
                }}>
                    <ChainHandle
                        type="source"
                        position={Position.Right}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeIncoming}
                        isActive={data.isEventTriggered}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    width: GAP_BETWEEN_EDITOR_CANVAS_DOTS * 6,
                    height: GAP_BETWEEN_EDITOR_CANVAS_DOTS * 3,
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    borderRadius: '14% 14% 14% 14%/28% 28% 28% 28%',
                    borderWidth: 3,
                    borderColor: data.style.borderColor,
                    backgroundColor: EColor.black,
                    borderStyle: 'solid',
                    boxSizing: 'border-box',
                }}
            >

                <NodeStyle.Name>
                    {data.name}
                </NodeStyle.Name>

            </Box>
        </>
    );
};
