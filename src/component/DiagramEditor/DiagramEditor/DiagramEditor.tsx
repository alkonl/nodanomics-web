import React from 'react';
import {DiagramCanvas} from "../DiagramCanvas";
import style from './DiagramEditor.module.scss'
import {TopToolBar, LeftBar} from "../toolbar";
import {useWidthAndHeight} from "../../../hooks";

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
                        <LeftBar/>
                        <div
                            style={{
                                position: 'relative',
                                flex: 1,
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 15,
                                    left: 15,
                                }}
                            >
                                <TopToolBar/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};
