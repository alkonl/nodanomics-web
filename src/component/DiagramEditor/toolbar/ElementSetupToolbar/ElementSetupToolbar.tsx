import React from 'react';
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../../redux";
import {Box, Typography, styled, Input, FormControlLabel} from "@mui/material";
import {EColor, EFontColor} from "../../../../constant";
import {EDiagramNode} from "../../../../interface";
import {useUpdateNode} from "../../../../hooks";
import {ColorPicker} from "../../../ColorPicker";

const SectionTitle = styled(Typography)({
    display: 'block',
    backgroundColor: EColor.grey1,
    paddingLeft: 1,
    color: EFontColor.grey4,
    fontWeight: 'bold',
    borderColor: EColor.grey2,
    borderStyle: 'solid',
    borderWidth: '1px',
    marginBottom: 16,
})

const ParameterLabel = styled(Typography)({
    color: EFontColor.grey4,
})

const ParameterContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
})

export const ElementSetupToolbar = () => {
    const dispatch = useAppDispatch()
    const {currentEditNodeId, diagramNodes} = useDiagramEditorState()
    const selectedNode = diagramNodes.find(node => node.id === currentEditNodeId)
    const {updateNodeData, updateNodeStyle} = useUpdateNode({
        nodeId: currentEditNodeId,
    })
    const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            type: EDiagramNode.Variable,
            label: event.target.value,
        })
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            type: EDiagramNode.Variable,
            name: event.target.value,
        })
    }

    const onColorChange = (color: string) => {
        updateNodeStyle({
            fillColor: color,
        })
    }

    return (
        <Box
            sx={{
                pointerEvents: 'auto',
                borderColor: EColor.grey2,
                borderStyle: 'solid',
                borderWidth: '1px',
                px: 2,
                py: 1,
                width: 250,
                backgroundColor: EColor.white,
            }}
        >
            <Typography sx={{
                color: EFontColor.grey4,
            }}>
                {selectedNode?.type}
            </Typography>
            <SectionTitle>
                Function
            </SectionTitle>
            <ParameterContainer>
                <ParameterLabel>
                    Name
                </ParameterLabel>
                <Input
                    value={selectedNode?.data.name || ''}
                    onChange={onNameChange}
                    type="text"
                    sx={{
                        color: EFontColor.grey4,
                        width: '100%',
                    }}/>
            </ParameterContainer>
            <SectionTitle>
                Style
            </SectionTitle>
            <Box sx={{
                paddingLeft: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}>
                <ParameterContainer>
                    <ParameterLabel>
                        Colour
                    </ParameterLabel>
                    <ColorPicker
                    onChange={onColorChange}
                    value={selectedNode?.data.style.fillColor || EColor.white}
                    />
                </ParameterContainer>
                <ParameterContainer>
                    <ParameterLabel>
                        Text
                    </ParameterLabel>
                    <Input
                        value={selectedNode?.data.label || ''}
                        onChange={onTextChange}
                        type="text"
                        sx={{
                            color: EFontColor.grey4,
                            width: '100%',
                        }}/>
                </ParameterContainer>
            </Box>
        </Box>
    );
};
