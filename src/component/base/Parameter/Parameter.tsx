import React from "react";
// eslint-disable-next-line import/named
import {Box, styled, TextField, TextFieldProps, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../../constant";
import {ParameterLabel} from "../Label";
import {ParametersContainer} from "./ParametersContainer";
import {ElementParameterContainer} from "./ElementParameterContainer";
import {IntellisenseInput, ParameterInput} from "../Input";
import {ParameterCheckbox} from "../Input/ParameterCheckbox";
import {isObject} from "../../../utils";

export const ElementSetupToolbarSectionTitle = styled(Box)({
    display: 'block',
    backgroundColor: 'transparent',
    paddingLeft: 1,
    padding: '4px',
    color: EFontColor.white,
    fontWeight: 'bold',
    borderColor: EColor.lightMarine3,
    borderStyle: 'solid',
    borderRadius: 2,
    borderWidth: '1px',
    marginBottom: 16,
})

export const ParameterText = styled(Typography)({
    color: EFontColor.lightMarine4,
    fontWeight: 'bold',
})

export const ParameterList: React.FC<{
    items?: string[] | {
        label: string
        value: string
    }[]
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
            {items?.map((item, index) => {
                if(isObject(item) && 'label' in item) {
                    return ( <Typography
                        sx={{
                            color: EColor.grey4,
                            fontSize: 14,
                        }}
                        key={`${item.value}-${index}`}
                    >
                        {item.label}
                    </Typography>)
                }
                return ( <Typography
                    sx={{
                        color: EColor.grey4,
                        fontSize: 14,
                    }}
                    key={`${item}-${index}`}
                >
                    {item}
                </Typography>)
            })}
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
    TextArea: TextArea,
    IntellisenseInput: IntellisenseInput,
}
