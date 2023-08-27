import React, {ChangeEventHandler} from 'react';
import {IFormulaNodeData} from "../../../../../../interface";
import {useUpdateNode} from "../../../../../../hooks";
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../styledComponents";



export const NodeFormulaResultParameter: React.FC<{
    nodeData: IFormulaNodeData
}> = ({nodeData}) => {

    return (
        <ElementParameter label="Result">
            <Parameter.Input
                value={nodeData.result?.value || ''}
            />
        </ElementParameter>
    )
};

