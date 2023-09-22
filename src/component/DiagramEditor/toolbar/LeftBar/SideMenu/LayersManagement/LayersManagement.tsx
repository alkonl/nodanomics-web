import React from 'react';
import {Box, Typography} from "@mui/material";
import {MButton, Parameter} from "../../../../../base";
import {useAddDiagramLayers} from "../../../../../../hooks";
import {useDiagramEditorState} from "../../../../../../redux";

export const LayersManagement = () => {
    const [newLayerName, setNewLayerName] = React.useState<string>('');

    const {addDiagramLayer} = useAddDiagramLayers();

    const createNewLayer = () => {
        addDiagramLayer({layerName: newLayerName});
    }

    const setNewLayerNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLayerName(event.target.value);
    }

    const layers = useDiagramEditorState().settings.layers


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
            <Box>
                {layers.map((layer, index) => {
                    return (<Typography key={layer.id}>
                        {layer.name}
                    </Typography>)
                })}
            </Box>
        </Box>
    );
};
