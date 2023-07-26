import React from 'react';
import {Box, Input} from "@mui/material";
import {ColorPicker} from "../../../ColorPicker";
import {EColor, EFontColor} from "../../../../constant";
import {ParameterContainer, ParameterLabel, SectionTitle} from "./styledComponents";
import {EElementType, IDiagramBaseInteractiveElementData} from "../../../../interface";
import {useUpdateElement} from "../../../../hooks";

export const ElementSetupToolbarStyleSection: React.FC<{
    element: IDiagramBaseInteractiveElementData
}> = ({element}) => {
    const {updateEdgeStyle, updateEdgeData, updateNodeData, updateNodeStyle} = useUpdateElement({
        elementId: element?.id,
        elementType: element?.elementType,
    })
    const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (element.elementType === EElementType.Node) {
            updateNodeData({
                label: event.target.value,
            })
        } else if (element.elementType === EElementType.Connection) {
            updateEdgeData({
                label: event.target.value,
            })
        }
    }
    const onColorChange = (color: string) => {
        if (element.elementType === EElementType.Node) {
            updateNodeStyle({
                fillColor: color,
            })
        } else if (element.elementType === EElementType.Connection) {
            updateEdgeStyle({
                fillColor: color,
            })
        }

    }
    return (
        <Box>
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
                        value={element?.style.fillColor || EColor.white}
                    />
                </ParameterContainer>
                <ParameterContainer>
                    <ParameterLabel>
                        Text
                    </ParameterLabel>
                    <Input
                        value={element?.label || ''}
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
