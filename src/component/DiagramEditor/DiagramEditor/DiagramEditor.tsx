import React, {useEffect, useRef, useState} from 'react';
import {DiagramCanvas} from "../DiagramCanvas";
import style from './DiagramEditor.module.scss'
import {TopToolBar} from "../toolbar";
import {useWidthAndHeight} from "../../../hooks";

export const DiagramEditor = () => {

const {elementSize: diagramCanvasContainerSize,elementRef: diagramCanvasContainerRef} = useWidthAndHeight()
    return (
        <div
            className={style.canvasContainer}
            ref={diagramCanvasContainerRef}
        >
<div>

</div>
            <DiagramCanvas />
            <div style={{
                position: 'absolute',
                width: diagramCanvasContainerSize.width,
                height: diagramCanvasContainerSize.height,
                pointerEvents: 'none',
            }}>
                <div
                style={{
                    position: 'relative',
                }}
                >
                </div>
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
    );
};
