import React from 'react';
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {LogicHandle} from "../../CustomHandle";
import {IMicroLoopNodeData} from "../../../../interface";
import {EventHandle} from "../../CustomHandle/EventHandle";
import {EColor} from "../../../../constant";

export const MicroLoopStartNode: React.FC<NodeProps<IMicroLoopNodeData>> = ({
                                                                                isConnectable
                                                                            }) => {
    return (
        <Box sx={{
            width: 10,
            height: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <Box sx={{
                position: 'relative',
            }}>
                <LogicHandle
                    type="source"
                    position={Position.Right}
                    isConnectable={isConnectable}
                />
            </Box>
            <Box sx={{
                position: 'relative',
            }}>
                <EventHandle
                    type="source"
                    position={Position.Right}
                    isConnectable={isConnectable}
                />

            </Box>
            <Box sx={{
                position: 'relative',
            }}>
                {/*<Handle*/}
                {/*    type="source"*/}
                {/*    position={Position.Right}*/}
                {/*    isConnectable={isConnectable}*/}
                {/*    // id="micro-loop-start"*/}
                {/*    id={'EConnection.EventConnection'}*/}
                {/*    style={{*/}
                {/*        background: EColor.orange,*/}
                {/*        width: '10px',*/}
                {/*        height: '10px',*/}
                {/*    }}*/}
                {/*/>*/}
            </Box>
        </Box>
    );
};
