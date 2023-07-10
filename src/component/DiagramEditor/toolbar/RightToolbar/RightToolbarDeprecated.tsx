import React from 'react';
import style from './RightToolbar.module.scss'
import {Box} from "@mui/material";
import {EDiagramNode, EElementType, EFontAlign, IDiagramNodeBaseData} from "../../../../interface";
import {NodePreviewSVG} from "../../../../assets";
import {TopToolBarHeaderDeprecated} from "./TopToolBarHeaderDeprecated";
import {RightToolbarElementSectionDeprecated, RightToolbarStyleSectionDeprecated} from "./section";
import {useDiagramEditorState} from "../../../../redux";

const mockSelectedNode: IDiagramNodeBaseData = {
    id: '1',
    name: 'Source',
    label: '',
    style: {
        borderColor: 'red',
        borderWidth: 2,
        textStyles: {
            fontAlign: EFontAlign.Left,
            fontColor: 'black',
            fontFamily: 'Arial',
            fontSize: 12,
            fontStyles: [],
        }
    },
}

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
