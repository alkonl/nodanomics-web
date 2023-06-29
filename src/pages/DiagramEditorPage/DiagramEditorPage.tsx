import React, {useEffect} from 'react';
import {DiagramEditor, DiagramEditorHeader} from "../../component";
import style from './DiagramEditorPage.module.scss'
import {useAppDispatch} from "../../redux";
import {useGetDiagramByIdQuery} from "../../api";
import {diagramEditorActions} from "../../redux/store";
import {useParams} from "react-router-dom";

export const DiagramEditorPage = () => {
    const dispatch = useAppDispatch()
    const {diagramId} = useParams() as { diagramId: string }
    const {data: diagram} = useGetDiagramByIdQuery(diagramId)

    useEffect(() => {
        if(diagram) {
            dispatch(diagramEditorActions.setCurrentDiagram({
                currentDiagramId: diagram.id,
                diagramName: diagram.name,
            }))
        }
    }, [dispatch, diagram])

    return (
        <div className={style.container}>
            <DiagramEditorHeader/>
            <DiagramEditor/>
        </div>
    );
};
