import React from 'react';
import style from './RightToolbar.module.scss'
import {Box} from "@mui/material";
import {EDiagramNode, EElementType, IDiagramNode, EFontAlign} from "../../../../interface";
import {NodePreviewSVG} from "../../../../assets";
import {TopToolBarHeader} from "./TopToolBarHeader";
import {RightToolbarElementSection, RightToolbarStyleSection} from "./section";

const mockSelectedNode: IDiagramNode = {
    id: '1',
    elementType: EElementType.Node,
    type: EDiagramNode.Source,
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
    zIndex: 1,
    preview: {
        type: 'Component',
        Component: NodePreviewSVG.Pool
    },
}

export const RightToolbar = () => {
    const [selectedNode, setSelectedNode] = React.useState<IDiagramNode | undefined>(mockSelectedNode);
    return (
        <Box className={style.container}>
            {selectedNode && <TopToolBarHeader elementInfo={selectedNode}/>}
            <RightToolbarElementSection/>
            <RightToolbarStyleSection/>
        </Box>
    );
};
