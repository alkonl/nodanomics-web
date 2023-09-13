import React from 'react';
import {FormBaseInput, IFormBaseInputProps} from "../FormInput";
// eslint-disable-next-line import/named
import {InputProps} from "@mui/material/Input/Input";
import {ParameterInput} from "./ParameterInput";
import {isFromInputValueEqual} from "../../../service";

export const ParameterInputFormInner: React.FC<InputProps & IFormBaseInputProps> = (
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

export const ParameterInputForm = React.memo(ParameterInputFormInner, isFromInputValueEqual)
