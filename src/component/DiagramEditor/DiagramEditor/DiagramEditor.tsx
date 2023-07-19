import React from 'react';
import {DiagramCanvas} from "../DiagramCanvas";
import style from './DiagramEditor.module.scss'
import {ElementSetupToolbar, LeftToolbar} from "../toolbar";
import {useWidthAndHeight, useUploadDiagramOnServer} from "../../../hooks";
import {Box, Button} from "@mui/material";
import {ElementToolbar} from "../toolbar/ElementToolbar/ElementToolbar";


export const DiagramEditor = () => {

    useUploadDiagramOnServer()

    const {elementSize: diagramCanvasContainerSize, elementRef: diagramCanvasContainerRef} = useWidthAndHeight()
    return (
        <Box
            className={style.container}
        >
            <Button
                onClick={() => {
                    console.log('click send message')
                }}
            >
                Send message
            </Button>
            <Box
                ref={diagramCanvasContainerRef}
                className={style.canvasContainer}>
                <DiagramCanvas/>
                <Box sx={{
                    position: 'absolute',
                    width: diagramCanvasContainerSize.width,
                    height: diagramCanvasContainerSize.height,
                    pointerEvents: 'none',
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <LeftToolbar/>
                        <Box
                            sx={{
                                position: 'relative',
                                flex: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 15,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                }}
                            >
                                <ElementToolbar/>
                            </Box>
                        </Box>
                        <ElementSetupToolbar/>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
