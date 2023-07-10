import React, {DragEvent} from 'react';
import {EDiagramNode, IDiagramElementPreviewTooltip} from "../../../../../interface";
import {Box, Tooltip} from "@mui/material";

export const ElementsToolbarElement: React.FC<IDiagramElementPreviewTooltip> = ({preview, tooltip, type}) => {
    // TODO add correct node type
    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: EDiagramNode) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <Tooltip title={tooltip}>
            <Box
                onDragStart={(event) => onDragStart(event, type)}
                sx={{
                    padding: '2px',
                }}
                draggable
            >
                <preview.Component/>
            </Box>
        </Tooltip>

    );
};
