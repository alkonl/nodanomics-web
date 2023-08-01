import React from 'react';
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {LogicHandle} from "../../CustomHandle";
import {IMicroLoopNodeData} from "../../../../interface";
import {EventHandle} from "../../CustomHandle/EventHandle";

export const MicroLoopStartNode: React.FC<NodeProps<IMicroLoopNodeData>> = ({
                                                                                isConnectable,
                                                                            }) => {

    return (
        <Box sx={{
            width: 10,
            height: 20,
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
        </Box>
    );
};
