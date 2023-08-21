import React, {ChangeEventHandler} from 'react';
import {IEventTriggerNodeData} from "../../../../../../interface";
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../styledComponents";
import {useUpdateNode} from "../../../../../../hooks";

export const NodeEventConditionParameter: React.FC<{
    nodeData: IEventTriggerNodeData
}> = ({nodeData}) => {


    const {updateNodeData} = useUpdateNode<IEventTriggerNodeData>({
        nodeId: nodeData.id,
    })

    const onChangeExpression: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        updateNodeData({
            eventCondition: event.target.value,
        })
    }


    return (
        <ElementParameter label="Event Condition">
            <Parameter.TextArea
                value={nodeData.eventCondition || ''}
                onChange={onChangeExpression}
            />

        </ElementParameter>
    )
}
