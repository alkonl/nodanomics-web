import React from 'react';
import {ParameterContainer, ParameterLabel} from "./styledComponents";
import {Input} from "@mui/material";
import {EFontColor} from "../../../../constant";
import {useCurrentEditElement, useUpdateElement} from "../../../../hooks";
import {EConnection} from "../../../../interface";

export const ConnectionFormulaParameter = () => {
    const selectedElementData = useCurrentEditElement()?.data
    const {updateEdgeData} = useUpdateElement({
        elementType: selectedElementData?.elementType,
        elementId: selectedElementData?.id,
    })

    const onFormulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateEdgeData({
            formula: event.target.value,
        })
    }

    if (selectedElementData?.type !== EConnection.DataConnection) {
        throw new Error('FormulaParameter should only be used for DataConnection')
    }

    return (
        <ParameterContainer>
            <ParameterLabel>
                Formula
            </ParameterLabel>
            <Input
                value={selectedElementData.formula || ''}
                onChange={onFormulaChange}
                type="text"
                sx={{
                    color: EFontColor.grey4,
                    width: '100%',
                }}/>
        </ParameterContainer>
    );
};
