import React, {DragEvent} from 'react';
import {EDiagramNode, IDiagramElement, IDiagramElementPreviewToolbarElement} from "../../../../../interface";
import {Box, Tooltip} from "@mui/material";

export const ElementsToolbarElementDeprecated: React.FC<IDiagramElementPreviewToolbarElement> = ({ tooltip, type}) => {
    // TODO add correct node type
    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: IDiagramElement) => {
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
                {/*<preview.Component/>*/}
            </Box>
        </Tooltip>

    );
};
