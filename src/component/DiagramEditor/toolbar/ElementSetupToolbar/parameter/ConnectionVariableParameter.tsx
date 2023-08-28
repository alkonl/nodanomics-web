import React from 'react';
import {EFontColor} from "../../../../../constant";
import {ILogicConnectionData} from "../../../../../interface";
import {useUpdateEdgeData} from "../../../../../hooks";
import {ElementParameter} from "./ElementParameter";
import {Parameter} from "../../../../base";

export const ConnectionVariableParameter: React.FC<{
    selectedElementData: ILogicConnectionData,
}> = ({selectedElementData}) => {

    const {updateVariableName, renderState} = useUpdateEdgeData({
        edgeId: selectedElementData.id,
    })

    const onVariableNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateVariableName({
            variableName: event.target.value,
        })
        renderState()
    }


    return (
        <ElementParameter label="Variable">
            <Parameter.Input
                value={selectedElementData.variableName || ''}
                onChange={onVariableNameChange}
                type="text"
                sx={{
                    color: EFontColor.grey4,
                    width: '100%',
                }}/>
        </ElementParameter>
    );
};
