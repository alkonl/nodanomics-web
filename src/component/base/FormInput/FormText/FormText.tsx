import React, {useMemo} from 'react';
import {FormBaseInput, IFormBaseInputProps, IFormLabelNode} from "../FormBaseInput";
import {BaseInput, IBaseInputProps} from "../../Input";
import {Text} from "../../Text";

type IFormTextProps = IFormBaseInputProps & IBaseInputProps & {
    label?: string;
}

export const FormText: React.FC<IFormTextProps> = ({label, ...props}) => {
    const Label: IFormLabelNode | undefined = useMemo(() => {
        if (label) {
            return {
                type: 'NODE',
                Node: <Text.Label>
                    {label}
                </Text.Label>
            }
        }
        return undefined
    }, [label])

    return (

        <FormBaseInput {...props}
                       Label={Label}
                       Input={BaseInput}
                       inputProps={props}
        />
    );
};

