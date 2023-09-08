import React from 'react';
import {IFormulaNodeData} from "../../../../../../interface";
import {useGetVariables, useUpdateNode} from "../../../../../../hooks";
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../../../../base";




export const NodeFormulaExpressionParameter: React.FC<{
    nodeData: IFormulaNodeData
}> = ({nodeData}) => {

    const variables = useGetVariables()

    const {updateNodeData} = useUpdateNode<IFormulaNodeData>({
        nodeId: nodeData.id,
    })


    const onChangeExpression = (formula: string) => {
        updateNodeData({
            formula,
        })
    }


    return (
        <ElementParameter label="Expression">
            <Parameter.IntellisenseInput
                value={nodeData.formula}
                onChange={onChangeExpression}
                variables={variables}
            />
        </ElementParameter>
    )
};

