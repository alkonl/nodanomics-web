import React from "react";
import {Box, Input, styled, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../../../constant";
// eslint-disable-next-line import/named
import {InputProps} from "@mui/material/Input/Input";

export const ElementSetupToolbarSectionTitle = styled(Box)({
    display: 'block',
    backgroundColor: EColor.grey1,
    paddingLeft: 1,
    padding: '4px',
    color: EFontColor.grey4,
    fontWeight: 'bold',
    borderColor: EColor.grey2,
    borderStyle: 'solid',
    borderWidth: '1px',
    marginBottom: 16,
})

export const ParameterLabel = styled(Typography)({
    width: '100%',
    marginTop: 4,
    textAlign: 'right',
    color: EFontColor.grey4,
    fontWeight: 600,
})

export const ParameterContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
})

export const ParameterText = styled(Typography)({
    color: EFontColor.grey4,
    fontWeight: 'bold',
})

const InputContainer: React.FC<InputProps> = ({sx,...props}) => {

    return <Input
        sx={{
            color: EFontColor.grey4,
            width: '100%',
            flex: 1,
            borderColor: EColor.grey2,
            borderWidth: 3,
            borderRadius: 0,
            borderStyle: 'solid',
            px: 0.5,
            ...sx,
        }}
        {...props}/>
}

export const Parameter = {
    Container: ParameterContainer,
    Label: ParameterLabel,
    Text: ParameterText,
    Input: InputContainer,
}
