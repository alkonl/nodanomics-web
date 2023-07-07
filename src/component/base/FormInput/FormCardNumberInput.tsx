import React from 'react';
import {FormBaseInput, IFormBaseInputProps} from "./FormBaseInput";
import {CardNumberInput} from "../Input";


export const FormCardNumberInput: React.FC<IFormBaseInputProps> = ({form, name,}) => {

    return (
        <FormBaseInput
            form={form}
            name={name}
            Input={CardNumberInput}
        />);
};

