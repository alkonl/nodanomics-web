import React, {DragEvent} from 'react';
import {EDiagramNode, IDiagramElement, IDiagramElementPreviewToolbarElement} from "../../../../interface";
import {Box, Tooltip, Typography} from "@mui/material";
import {EColor} from "../../../../constant";

export const ElementToolbarElement: React.FC<{
    element: IDiagramElementPreviewToolbarElement
}> = ({element}) => {
    const onDragStart = (event: DragEvent<HTMLSpanElement>, nodeType: IDiagramElement) => {
        console.log('onDragStart: ', nodeType)
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    return (
        <Tooltip title={element.tooltip}>
            <Typography
                onDragStart={(event) => onDragStart(event, element.type)}
                sx={{
                    pointerEvents: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: EColor.grey4,
                    borderColor: EColor.grey2,
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    textAlign: 'center'
                }}
                draggable
            >
                {element.toolbarName}
                {/*<preview.Component/>*/}
            </Typography>
        </Tooltip>
    );
};
