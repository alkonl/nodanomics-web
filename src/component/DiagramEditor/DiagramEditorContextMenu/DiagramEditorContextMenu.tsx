import React from 'react';
import {Box} from "@mui/material";
import {EColor} from "../../../constant";
import {useChangeLayer} from "../../../hooks";
import {MSelect} from "../../base";
import {INodeData} from "../../../interface";

export const DiagramEditorContextMenu: React.FC<{
    node: INodeData,
}> = ({node}) => {

    const {
        currentLayer,
        layers,
        updateLayer,
    } = useChangeLayer(node)



    return (
        <Box sx={{
            backgroundColor: EColor.darkMarineLight,
            padding: 2,
        }}>
            <MSelect.Parameters
                currentValue={currentLayer?.id}
                onChange={updateLayer}
                values={layers}
            />
        </Box>
    );
};
