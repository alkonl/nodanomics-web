import React from 'react';
import style from './RightToolbar.module.scss'
import {Box} from "@mui/material";
import {EDiagramNode, EElementType, EFontAlign, IDiagramNodeBaseData} from "../../../../interface";
import {NodePreviewSVG} from "../../../../assets";
import {TopToolBarHeader} from "./TopToolBarHeader";
import {RightToolbarElementSection, RightToolbarStyleSection} from "./section";

const mockSelectedNode: IDiagramNodeBaseData = {
    id: '1',
    name: 'Source',
    label: '',
    style: {
        borderColor: 'red',
        borderWidth: 2,
        isFilled: false,
        textStyles: {
            fontAlign: EFontAlign.Left,
            fontColor: 'black',
            fontFamily: 'Arial',
            fontSize: 12,
            fontStyles: [],
        }
    },
    preview: {
        type: 'Component',
        Component: NodePreviewSVG.Pool
    },
}

export const RightToolbar = () => {
    const [selectedNode, setSelectedNode] = React.useState<IDiagramNodeBaseData | undefined>(mockSelectedNode);
    return (
        <Box className={style.container}>
            {selectedNode && <TopToolBarHeader elementData={selectedNode}/>}
            <RightToolbarElementSection/>
            <RightToolbarStyleSection/>
        </Box>
    );
};
