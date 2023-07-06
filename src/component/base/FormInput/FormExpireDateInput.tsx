import React from 'react';
import {FormBaseInput, IFormBaseInputProps} from "./FormBaseInput";
import {ExpireDateInput} from "../Input";


export const FormExpireDateInput: React.FC<IFormBaseInputProps> = ({form, name,}) => {
    return (
        <FormBaseInput
            form={form}
            name={name}
            Input={ExpireDateInput}
        />);
};

