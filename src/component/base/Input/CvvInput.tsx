import React from 'react';
import {BaseInput} from "./BaseInput";
import {IBaseFormInput} from "../FormInput";
import {formatCVV} from "../../../utils";

export const CvvInput: React.FC<IBaseFormInput> = ({onChange, value}) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        e.target.value = formatCVV(value);
        if (onChange) {
            onChange(e);
        }
    }
    return (
        <BaseInput onChange={handleChange} value={value}/>
    );
};
