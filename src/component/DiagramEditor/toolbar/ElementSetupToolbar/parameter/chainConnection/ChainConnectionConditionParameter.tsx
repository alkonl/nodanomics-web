import React from 'react';
import {IChainConnectionData} from "../../../../../../interface";
import {useUpdateEdgeData} from "../../../../../../hooks";
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../../../../base";

export const ChainConnectionConditionParameter: React.FC<{
    edgeData: IChainConnectionData
}> = ({edgeData}) => {

    const {updateEdgeData} = useUpdateEdgeData<IChainConnectionData>({
        edgeId: edgeData.id,
    })

    const onChangeCondition = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateEdgeData({
            condition: event.target.value,
        })
    }


    return (
        <ElementParameter label="Condition">
            <Parameter.Input
                value={edgeData.condition || ''}
                onChange={onChangeCondition}
            />

        </ElementParameter>
    )
}
