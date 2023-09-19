import React from 'react';
import {Box, Typography} from "@mui/material";
import {EColor} from "../../../../../../constant";
import {IReactFlowNode} from "../../../../../../interface";

export const NodeNestedItem: React.FC<{
    node: IReactFlowNode
    onNodeClick?: (node: IReactFlowNode) => void
}> = ({onNodeClick,node}) => {
    return (
        <Box>
            <Typography
                onClick={()=>{
                    if(onNodeClick){
                        onNodeClick(node)
                    }
                }}
                sx={{
                    '&:hover': {
                        background: EColor.grey,
                    },
                    cursor: 'pointer',
                }}>
                {node.data.name}
            </Typography>
        </Box>
    );
};

