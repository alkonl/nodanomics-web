import React from 'react';
import {BaseInput} from "./BaseInput";
import {IBaseFormInput} from "../FormInput";
import {formatExpirationDate} from "../../../utils";

export const ExpireDateInput: React.FC<IBaseFormInput> = ({onChange, value}) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        e.target.value = formatExpirationDate(value);
        if (onChange) {
            onChange(e);
        }
    }

    return (
        <BaseInput onChange={handleChange} value={value}/>
    );
};
