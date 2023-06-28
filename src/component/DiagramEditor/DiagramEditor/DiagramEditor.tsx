import React, {useEffect, useRef, useState} from 'react';
import {DiagramCanvas} from "../DiagramCanvas";
import style from './DiagramEditor.module.scss'

export const DiagramEditor = () => {


    return (
        <div
            className={style.canvasContainer}
        >
            <DiagramCanvas/>
        </div>
    );
};
