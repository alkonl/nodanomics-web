import React from 'react';
import {Box} from "@mui/material";
import {EColor} from "../../../../constant";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {IMicroLoopNodeData} from "../../../../interface";

export const MicroLoop: React.FC<NodeProps<IMicroLoopNodeData>> = (props) => {
    const {data} = props
    console.log(`MicroLoopNode: ${data.id}`, props)
    return (
        <Box
            sx={{
                width: data.style.width,
                height: data.style.height,
                borderWidth: 1,
                borderColor: EColor.black,
                borderStyle: 'solid',
            }}
        >
            MicroLoop
            id: {data.id}
        </Box>
    );
};
