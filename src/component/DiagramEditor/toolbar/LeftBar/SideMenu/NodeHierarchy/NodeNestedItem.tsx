import React from 'react';
import {Box, Typography} from "@mui/material";
import {EColor} from "../../../../../../constant";
import {IReactFlowNode} from "../../../../../../interface";
import {nodeTypeName} from "../../../../../../service";

export const NodeNestedItem: React.FC<{
    node: IReactFlowNode
    onNodeClick?: (node: IReactFlowNode) => void
}> = ({onNodeClick, node}) => {
    return (
        <Box>
            <Typography
                onClick={() => {
                    if (onNodeClick) {
                        onNodeClick(node)
                    }
                }}
                sx={{
                    '&:hover': {
                        borderWidth: 2,
                        borderColor: EColor.lightMarine3,
                        borderStyle: 'solid',
                        transition: '0.2s ease-in-out',
                    },
                    cursor: 'pointer',
                }}>
                {node.data.name} ({nodeTypeName[node.data.type]})
            </Typography>
        </Box>
    );
};

