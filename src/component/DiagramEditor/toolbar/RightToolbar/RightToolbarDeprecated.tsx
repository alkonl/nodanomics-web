import React from 'react';
import style from './RightToolbar.module.scss'
import {Box} from "@mui/material";
import {TopToolBarHeaderDeprecated} from "./TopToolBarHeaderDeprecated";
import {RightToolbarElementSectionDeprecated, RightToolbarStyleSectionDeprecated} from "./section";
import {useDiagramEditorState} from "../../../../redux";


export const RightToolbarDeprecated = () => {
    const {currentEditNodeId, diagramNodes} = useDiagramEditorState()
    const selectedNode = diagramNodes.find(node => node.id === currentEditNodeId)
    console.log(selectedNode)
    return (
        <Box className={style.container}>
            {selectedNode && <TopToolBarHeaderDeprecated elementData={selectedNode.data}/>}
            <RightToolbarElementSectionDeprecated/>
            {selectedNode &&  <RightToolbarStyleSectionDeprecated elementData={selectedNode.data}/>}
        </Box>
    );
};
