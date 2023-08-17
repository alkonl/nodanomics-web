import React from 'react';
import {Box, Typography} from "@mui/material";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {Position} from "reactflow";

export const StartNode = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography>
                Start
            </Typography>
            <ChainHandle
                type="source"
                position={Position.Right}

            />
        </Box>
    );
};

