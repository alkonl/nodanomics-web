import React from 'react';
import {FormBaseInput, IFormBaseInputProps} from "./FormBaseInput";
import {CvvInput} from "../Input/CvvInput";


export const FormCvvInput: React.FC<IFormBaseInputProps> = ({form, name,}) => {
    return (
        <FormBaseInput
            form={form}
            name={name}
            Input={CvvInput}
        />);
};

