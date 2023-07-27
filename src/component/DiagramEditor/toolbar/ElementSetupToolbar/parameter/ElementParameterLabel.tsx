import React from 'react';
import {Parameter} from "../styledComponents";

export const ElementParameterLabel: React.FC<{
    label: string,
}> = ({label}) => {
    return (<Parameter.Label>
        Name
    </Parameter.Label>)
};
