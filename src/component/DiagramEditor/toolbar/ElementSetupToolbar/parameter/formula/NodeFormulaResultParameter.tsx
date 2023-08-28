import React from 'react';
import {IFormulaNodeData} from "../../../../../../interface";
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../../../../base";



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

