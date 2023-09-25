import React from 'react';
import {Box, Typography} from "@mui/material";
import {MButton, Parameter} from "../../../../../base";
import {useAddDiagramLayers} from "../../../../../../hooks";
import {useDiagramEditorState} from "../../../../../../redux";
import {EColor, EFontColor} from "../../../../../../constant";
import {LayerListItem} from "./LayerListItem";

export const LayersManagement = () => {

    const {submitCreateNewLayer, setNewLayerNameHandler, newLayerName} = useAddDiagramLayers();


    const layers = useDiagramEditorState().settings.layers


    return (
        <Box sx={{
            backgroundColor: EColor.darkMarineLight,
        }}>
            <Typography sx={{
                padding: 1,
                fontWeight: 'bold',
                color: EFontColor.lightMarine4
            }}>
                Layers
            </Typography>
            <Box sx={{
                display: 'flex'
            }}>
                <Parameter.Input onChange={setNewLayerNameHandler} value={newLayerName}/>
                <MButton.Submit onClick={submitCreateNewLayer}>
                    Create
                </MButton.Submit>
            </Box>
            <Box component='table'>
                <Box component='thead'>
                    <Box component='tr'>
                        <Typography component='th'>
                            Name
                        </Typography>
                        <Typography component='th'>
                            Visible
                        </Typography>
                        <Typography component='th'>
                            Selected
                        </Typography>
                    </Box>
                </Box>
                <Box component="tbody">
                    {layers?.map((layer) => {
                        return (<LayerListItem layer={layer} key={layer.id}/>)
                    })}
                </Box>

            </Box>
        </Box>
    );
};
