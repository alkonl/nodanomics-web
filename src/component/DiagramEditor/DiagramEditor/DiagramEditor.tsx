import React from 'react';
import {DiagramCanvas} from "../DiagramCanvas";
import style from './DiagramEditor.module.scss'
import {ElementsToolbar, LeftToolbar, RightToolbar} from "../toolbar";
import {useWidthAndHeight} from "../../../hooks";
import {Box} from "@mui/material";

export const DiagramEditor = () => {

    const {elementSize: diagramCanvasContainerSize, elementRef: diagramCanvasContainerRef} = useWidthAndHeight()
    return (
        <div
            className={style.container}
        >
            <div
                ref={diagramCanvasContainerRef}
                className={style.canvasContainer}>
                <DiagramCanvas/>
                <div style={{
                    position: 'absolute',
                    width: diagramCanvasContainerSize.width,
                    height: diagramCanvasContainerSize.height,
                    pointerEvents: 'none',
                }}>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <LeftToolbar/>
                        <div
                            style={{
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
                                <ElementsToolbar/>
                            </Box>
                        </div>
                        <RightToolbar/>
                    </div>

                </div>
            </div>

        </div>
    );
};
