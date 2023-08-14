import React from 'react';
import {ElementParameter} from "./ElementParameter";
import {Box, Typography} from "@mui/material";
import {IDiagramNodeBaseData} from "../../../../../interface";
import {EColor} from "../../../../../constant";

export const NodeConnectedNodesParameter: React.FC<{
    baseNodeData: IDiagramNodeBaseData
}> = ({baseNodeData}) => {




    return (
        <ElementParameter label="Connected Nodes">
            <Box
            sx={{
                padding: 0.5,
                height: 120,
                flex: 1,
                borderColor: EColor.grey2,
                borderWidth: 3,
                borderRadius: 0,
                borderStyle: 'solid',
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
            >
                {baseNodeData?.connectedNodes?.map((nodeName) => (
                    <Typography
                        sx={{
                            color: EColor.grey4,
                            fontSize: 14,
                        }}
                        key={nodeName}
                    >
                        {nodeName}
                    </Typography>
                ))}
            </Box>
        </ElementParameter>
    );
};

