import React from 'react';
import {Box, Typography} from "@mui/material";
import {EColor} from "../../../../../../constant";
import {GroupNodeItem} from "./GroupNodeItem";
import {IGroupedNodes} from "../../../../../../interface";

export const GroupTagItem: React.FC<{
    group: IGroupedNodes
}> = ({group}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.25,
            }}
            key={group.tag} >
            <Typography sx={{
                fontWeight: 'bold',
                width: '100%',
                backgroundColor: EColor.grey,
                padding: 0.5,
            }}>
                {group.tag}
            </Typography>
            <Box>
                {group.nodes.map(({nodeName, nodeId}) => {
                    return (
                        <GroupNodeItem
                            nodeName={nodeName}
                            nodeId={nodeId}
                            key={nodeId}
                        />
                    )
                })}
            </Box>
        </Box>
    );
};
