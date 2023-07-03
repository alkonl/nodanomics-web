import React from 'react';
import {DiagramEditor} from "../../component";
import style from './DiagramEditorPage.module.scss'

export const DiagramEditorPage = () => {
    return (
        <div className={style.container}>
            <DiagramEditor/>
        </div>
    );
};
