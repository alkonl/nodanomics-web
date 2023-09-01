import React from 'react';
import {FormBaseInput, IFormBaseInputProps} from "../FormInput";
// eslint-disable-next-line import/named
import {InputProps} from "@mui/material/Input/Input";
import {ParameterInput} from "./ParameterInput";

export const ParameterInputForm: React.FC<InputProps & IFormBaseInputProps> = (
    {
        form,
        name,
        ...props
    }) => {
    return (
        <FormBaseInput
            form={form}
            name={name}
            Input={(formProps) => {
                const inputProps = {
                    ...props,
                    ...formProps,
                }
                return <ParameterInput {...inputProps} />
            }}
        />
    );
};
