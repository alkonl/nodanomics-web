import React from 'react';
import {IChainConnectionData} from "../../../../../../interface";
import {useGetVariables, useUpdateEdgeData} from "../../../../../../hooks";
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../../../../base";

export const ChainConnectionConditionParameter: React.FC<{
    edgeData: IChainConnectionData
}> = ({edgeData}) => {

    const variables = useGetVariables()

    const {updateEdgeData} = useUpdateEdgeData<IChainConnectionData>({
        edgeId: edgeData.id,
    })

    const onChangeCondition = (condition: string) => {
        updateEdgeData({
            condition,
        })
    }

    return (
        <ElementParameter label="Condition">
            <Parameter.IntellisenseInput
                value={edgeData.condition || ''}
                onChange={onChangeCondition}
                variables={variables}
            />

        </ElementParameter>
    )
}
