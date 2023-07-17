import React from 'react';
import {Box, Input, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../../../constant";
import {EConnection, EDiagramNode, EElementType} from "../../../../interface";
import {useCurrentEditElement, useUpdateElement} from "../../../../hooks";
import {ParameterContainer, ParameterLabel, SectionTitle} from "./styledComponents";
import {ElementSetupToolbarStyleSection} from "./ElementSetupToolbarStyleSection";
import {FormulaParameter} from "./FormulaParameter";
import {NodeActionParameter} from "./NodeActionParameter";


export const ElementSetupToolbar = () => {
    const selectedElementData = useCurrentEditElement()?.data
    const {updateNodeData, updateEdgeData} = useUpdateElement({
        elementType: selectedElementData?.elementType,
        elementId: selectedElementData?.id,
    })


    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedElementData?.elementType === EElementType.Node) {
            updateNodeData({
                type: EDiagramNode.Variable,
                name: event.target.value,
            })
        } else if (selectedElementData?.elementType === EElementType.Connection) {
            updateEdgeData({
                name: event.target.value,
            })
        }
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
            {selectedElementData ?
                <>
                    <Typography sx={{
                        color: EFontColor.grey4,
                    }}>
                        {selectedElementData?.type}
                    </Typography>
                    <SectionTitle>
                        Function
                    </SectionTitle>
                    {selectedElementData && <ParameterContainer>
                        <ParameterLabel>
                            Name
                        </ParameterLabel>
                        <Input
                            value={selectedElementData?.name || ''}
                            onChange={onNameChange}
                            type="text"
                            sx={{
                                color: EFontColor.grey4,
                                width: '100%',
                            }}/>
                    </ParameterContainer>}
                    {selectedElementData?.type === EConnection.DataConnection && <FormulaParameter/>}
                    {'actionMode' in selectedElementData && <NodeActionParameter/>}
                    {selectedElementData && <ElementSetupToolbarStyleSection element={selectedElementData}/>}
                </>
                : <Typography>
                    Please select an element to edit
                </Typography>
            }
        </Box>
    );
};
