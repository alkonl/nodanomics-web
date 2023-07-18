import React from 'react';
import {Input} from "@mui/material";
import {ParameterContainer, ParameterLabel} from "./styledComponents";
import {EFontColor} from "../../../../constant";
import {ILogicConnectionData} from "../../../../interface";
import {useUpdateEdgeData} from "../../../../hooks";

export const ConnectionVariableParameter: React.FC<{
    selectedElementData: ILogicConnectionData,
}> = ({selectedElementData}) => {

    const {updateEdgeData} = useUpdateEdgeData({
        edgeId: selectedElementData.id,
    })

    const onVariableNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateEdgeData({
            variableName: event.target.value,
        })
    }


    return (
        <ParameterContainer>
            <ParameterLabel>
                Variable
            </ParameterLabel>
            <Input
                value={selectedElementData.variableName || ''}
                onChange={onVariableNameChange}
                type="text"
                sx={{
                    color: EFontColor.grey4,
                    width: '100%',
                }}/>
        </ParameterContainer>
    );
};
