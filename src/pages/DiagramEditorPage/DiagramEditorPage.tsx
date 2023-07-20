import React, {useEffect} from 'react';
import {DiagramEditor, DiagramEditorHeader} from "../../component";
import style from './DiagramEditorPage.module.scss'
import {useAppDispatch,diagramEditorActions} from "../../redux";

import {useParams} from "react-router-dom";

export const DiagramEditorPage = () => {
    const dispatch = useAppDispatch()
    const {diagramId} = useParams() as { diagramId: string }
    // const {data: diagram} = useGetDiagramByIdQuery(diagramId)

    useEffect(() => {
        if(diagramId) {
            dispatch(diagramEditorActions.setCurrentDiagram({
                diagramId: diagramId,
            }))
        }
    }, [dispatch, diagramId])

    return (
        <div className={style.container}>
            <DiagramEditorHeader/>
            <DiagramEditor/>
        </div>
    );
};
