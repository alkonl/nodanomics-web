import React from 'react';
import {Box, Typography} from "@mui/material";
import {IDiagramLayer} from "../../../../../../interface";
import {Parameter} from "../../../../../base";
import {useDiagramLayerManagement} from "../../../../../../hooks";

export const LayerListItem: React.FC<{
    layer: IDiagramLayer
}> = ({
          layer,
      }) => {

    const {selectLayer, changeVisibility} = useDiagramLayerManagement();

    const selectLayerHandler = () => {
        selectLayer(layer.id);
    }

    const changeVisibilityHandler = () => {
        changeVisibility(layer.id);
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
                    onChange={selectLayerHandler}
                    checked={layer.visible}

                />
            </Box>
            <Box component='td'>
                <Parameter.Checkbox
                    onChange={changeVisibilityHandler}
                    checked={layer.isSelected}
                />
            </Box>
        </Box>
    );
};

