import React, {useEffect} from 'react';
import {DiagramEditor} from "../../component";
import style from './DiagramEditorPage.module.scss'
import {Typography} from "@mui/material";
import {useAppDispatch, useDiagramEditorState} from "../../redux";
import {useGetDiagramByIdQuery} from "../../api";
import {diagramEditorActions} from "../../redux/store";

export const DiagramEditorPage = () => {
    const dispatch = useAppDispatch()
    const {data: diagram} = useGetDiagramByIdQuery('dbffdb70-f38f-4a3b-84c4-bd624ecf738c')
    const {diagramName} = useDiagramEditorState()

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
            <Typography variant="h3">
                {diagramName}
            </Typography>
            <DiagramEditor/>
        </div>
    );
};
