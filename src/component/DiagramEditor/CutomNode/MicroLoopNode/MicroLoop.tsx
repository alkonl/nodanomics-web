import React from 'react';
import {Box} from "@mui/material";
import {EColor} from "../../../../constant";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {IMicroLoopNodeData} from "../../../../interface";

export const MicroLoop: React.FC<NodeProps<IMicroLoopNodeData>> = ({
                                                                       data
                                                                   }) => {
    return (
        <Box
            sx={{
                width: data.style.width || 200,
                height: data.style.width || 200,
                borderWidth: 1,
                borderColor: EColor.black,
                borderStyle: 'solid'
            }}
        >
            MicroLoop
        </Box>
    );
};
