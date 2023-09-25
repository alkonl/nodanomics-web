import React from 'react';
import {Box, Typography} from "@mui/material";
import {IDiagramLayer} from "../../../../../../interface";
import {MButton, Parameter} from "../../../../../base";
import {useDiagramLayerManagement} from "../../../../../../hooks";

export const LayerListItem: React.FC<{
    layer: IDiagramLayer
}> = ({
          layer,
      }) => {

    const {selectLayer, changeVisibility, deleteLayer} = useDiagramLayerManagement();

    const selectLayerHandler = () => {
        selectLayer(layer.id);
    }

    const changeVisibilityHandler = () => {
        changeVisibility(layer.id);
    }

    const deleteLayerHandler = () => {
        deleteLayer(layer.id);
    }

    return (
        <Box  component='tr'>
            <Box component='td'>
                <Typography >
                    {layer.name}
                </Typography>
            </Box>

            <Box component='td'>
                <Parameter.Checkbox
                    onChange={changeVisibilityHandler}
                    checked={layer.visible}

                />
            </Box>
            <Box component='td'>
                <Parameter.Checkbox
                    onChange={selectLayerHandler}
                    checked={layer.isSelected}
                />
            </Box>
            <Box component='td'>
                <MButton.Submit onClick={deleteLayerHandler}>
                    Delete
                </MButton.Submit>
            </Box>
        </Box>
    );
};

