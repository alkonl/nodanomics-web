import React from 'react';
import {BaseInput} from "./BaseInput";
import {IBaseFormInput} from "../FormInput";
import {formatCardNumber} from "../../../utils";

export const CardNumberInput: React.FC<IBaseFormInput> = ({onChange, value}) => {

    const formattedValue = value && typeof value === 'string' ? formatCardNumber(value) : '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        e.target.value = formatCardNumber(value);
        if (onChange) {
            onChange(e);
        }
    }

    return (
        <BaseInput onChange={handleChange} value={formattedValue}/>
    );
};
