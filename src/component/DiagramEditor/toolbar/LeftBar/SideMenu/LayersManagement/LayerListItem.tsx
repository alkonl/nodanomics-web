import React from 'react';
import {Box, Typography} from "@mui/material";
import {IDiagramLayer} from "../../../../../../interface";
import {MButton, Parameter} from "../../../../../base";
import {useDiagramLayerManagement, useToggle} from "../../../../../../hooks";
import {DiagramLayerDeletePopUp} from "../../../../DiagramLayer";

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

    const deleteLayerHandler = () => {
        layerDeletePopUp.open()
    }

    const layerDeletePopUp = useToggle()

    return (
        <>
            <DiagramLayerDeletePopUp
                layer={layer}
                isShow={layerDeletePopUp.isOpened}
                onClose={layerDeletePopUp.close}
            />
            <Box component='tr'>
                <Box component='td'>
                    <Typography>
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
        </>

    );
};

