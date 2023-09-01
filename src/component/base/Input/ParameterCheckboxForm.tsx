import React from "react";
// eslint-disable-next-line import/named
import {InputProps} from "@mui/material/Input/Input";
import {FormBaseInput, IFormBaseInputProps} from "../FormInput";
import {ParameterCheckbox} from "./ParameterCheckbox";

export const ParameterCheckboxForm: React.FC<InputProps & IFormBaseInputProps> = (
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
                return <ParameterCheckbox onChange={formProps.onChange} checked={formProps.value} {...props} />
            }}
        />
    );
};
