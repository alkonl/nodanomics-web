import React from "react";
// eslint-disable-next-line import/named
import {Box, Grid, styled, TextField, TextFieldProps, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../../constant";
import {ParameterLabel} from "../Label";
import {ParametersContainer} from "./ParametersContainer";
import {ElementParameterContainer} from "./ElementParameterContainer";
import {ParameterInput} from "../Input";
import {ParameterCheckbox} from "../Input/ParameterCheckbox";

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

export const ParameterText = styled(Typography)({
    color: EFontColor.grey4,
    fontWeight: 'bold',
})

export const ParameterList: React.FC<{
    items?: string[]
}> = ({items}) => {
    return (<Box
            sx={{
                padding: 0.5,
                height: 120,
                flex: 1,
                borderColor: EColor.grey2,
                borderWidth: 3,
                borderRadius: 0,
                borderStyle: 'solid',
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
        >
            {items?.map((item) => (
                <Typography
                    sx={{
                        color: EColor.grey4,
                        fontSize: 14,
                    }}
                    key={item}
                >
                    {item}
                </Typography>
            ))}
        </Box>

    )
}

const TextArea: React.FC<TextFieldProps> = ({...props}) => {
    return <TextField
        multiline
        rows={4}
        sx={{
            color: EFontColor.grey4,
            borderColor: EColor.grey2,
            borderStyle: 'solid',
        }}
        {...props}/>
}

export const Parameter = {
    Container: ParametersContainer,
    ElementContainer: ElementParameterContainer,
    Checkbox: ParameterCheckbox,
    Label: ParameterLabel,
    Text: ParameterText,
    Input: ParameterInput,
    List: ParameterList,
    TextArea: TextArea
}
