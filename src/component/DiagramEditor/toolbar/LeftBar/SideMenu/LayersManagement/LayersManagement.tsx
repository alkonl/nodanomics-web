import React from 'react';
import {Box, Typography} from "@mui/material";
import {MButton, Parameter} from "../../../../../base";
import {useDiagramLayers} from "../../../../../../hooks";

export const LayersManagement = () => {
    const [newLayerName, setNewLayerName] = React.useState<string>('');

    const {addDiagramLayer} = useDiagramLayers();

    const createNewLayer = () => {
        addDiagramLayer({layerName: newLayerName});
    }

    const setNewLayerNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLayerName(event.target.value);
    }


    return (
        <Box>
            <Typography sx={{
                padding: 1,
            }}>
                Layers
            </Typography>
            <Box sx={{
                display: 'flex'
            }}>
                <Parameter.Input onChange={setNewLayerNameHandler} value={newLayerName}/>
                <MButton.Submit onClick={createNewLayer}>
                    Create
                </MButton.Submit>
            </Box>
        </Box>
    );
};
