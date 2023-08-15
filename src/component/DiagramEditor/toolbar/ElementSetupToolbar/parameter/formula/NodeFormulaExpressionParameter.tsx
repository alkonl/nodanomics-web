import React, {ChangeEventHandler} from 'react';
import {IFormulaNodeData} from "../../../../../../interface";
import {useUpdateNode} from "../../../../../../hooks";
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../styledComponents";



export const NodeFormulaExpressionParameter: React.FC<{
    nodeData: IFormulaNodeData
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IFormulaNodeData>({
        nodeId: nodeData.id,
    })

    const onChangeExpression: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        updateNodeData({
           formula: event.target.value,
        })
    }


    return (
        <ElementParameter label="Expression">
            <Parameter.TextArea
                value={nodeData.formula || ''}
                onChange={onChangeExpression}
            />

        </ElementParameter>
    )
};

