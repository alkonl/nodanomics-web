import React from 'react';
import {FormBaseInput, IFormBaseInputProps} from "../base/FormInput";
import {ColorPicker} from "./ColorPicker";
import {isFromInputValueEqual} from "../../service";

export const ColorPickerFormInner: React.FC<IFormBaseInputProps> = ({
                                                            form,
                                                            name
                                                        }) => {
    return (
        <FormBaseInput
            form={form}
            name={name}
            Input={({onChange, value}) => {
                return <ColorPicker
                    value={value?.toString()}
                    onChange={onChange}
                />
            }}
        />
    );
};

export const ColorPickerForm = React.memo(ColorPickerFormInner, isFromInputValueEqual);
