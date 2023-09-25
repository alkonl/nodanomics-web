import React from 'react';
import {Box, Typography} from "@mui/material";
import {IDiagramLayer} from "../../../../interface";
import {MButton} from "../../../base";
import {EColor} from "../../../../constant";
import {useDeleteNode, useDiagramLayerManagement} from "../../../../hooks";
import {useDiagramEditorState} from "../../../../redux";

export const LayerDelete: React.FC<{
    layer: IDiagramLayer;
}> = ({layer}) => {
    const {diagramNodes} = useDiagramEditorState()
    const deleteNodes = useDeleteNode()
    const {deleteLayer} = useDiagramLayerManagement();

    const deleteLayerHandler = () => {
        const nodeIdsToDelete: string[] = []
        diagramNodes.forEach(node => {
            if (node.data.layerId === layer.id) {
                nodeIdsToDelete.push(node.id)
            }
        })
        deleteNodes(nodeIdsToDelete)
        deleteLayer(layer.id);
    }

    return (
        <Box sx={{
            padding: 2,
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            backgroundColor: EColor.darkMarineLight,
            borderRadius: '14px',
        }}>
            <Box>
                <Typography sx={{
                    color: EColor.white,
                    fontSize: 20,
                }}>
                    Are you sure you want to delete layer {layer.name}?
                </Typography>
                <Typography sx={{
                    color: EColor.white,
                }}>
                    all nodes will be deleted
                </Typography>
            </Box>
            <MButton.Submit
                onClick={deleteLayerHandler}
            >
                DELETE
            </MButton.Submit>
        </Box>
    );
};

