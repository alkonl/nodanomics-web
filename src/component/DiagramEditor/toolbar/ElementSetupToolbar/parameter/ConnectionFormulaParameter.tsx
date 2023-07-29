import React from 'react';
import {useUpdateEdgeData} from "../../../../../hooks";
import {IDataConnectionData} from "../../../../../interface";
import {ElementParameter} from "./ElementParameter";
import {Parameter} from "../styledComponents";

export const ConnectionFormulaParameter: React.FC<{
    connection: IDataConnectionData
}> = ({connection}) => {

    const {updateEdgeData} = useUpdateEdgeData({
        edgeId: connection.id,
    })

    const onFormulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateEdgeData({
            formula: event.target.value,
        })
    }



    return (
        <ElementParameter label="Formula">
            <Parameter.Input
                value={connection.formula || ''}
                onChange={onFormulaChange}
            />
        </ElementParameter>
    );
};
