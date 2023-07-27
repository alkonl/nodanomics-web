import React from 'react';
import {Parameter} from "../styledComponents";
import {useUpdateElement, useUpdateNode} from "../../../../../hooks";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {ENodeTrigger} from "../../../../../interface";

export const NodeTagParameter: React.FC<{

}> = ({}) => {

    const {updateNodeTrigger} = useUpdateNode({
        elementId: selectedElementData?.id,
    })
    const changeNodeTriggerMode = (event: SelectChangeEvent) => {
        updateNodeTrigger({
            trigger: event.target.value as ENodeTrigger,
        })
    }

    return (
        <Parameter.Container>
            <Parameter.Label>
                Tag
            </Parameter.Label>
            <Parameter.Input/>
        </Parameter.Container>
    );
};
