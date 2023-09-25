import React from 'react';
import {IDiagramBaseInteractiveElementData,} from "../../../../../../interface";
import {ElementParameter} from "../ElementParameter";
import {useUpdateElement} from "../../../../../../hooks";
import {Parameter} from "../../../../../base";

export const ElementCommentParameter: React.FC<{
    element: IDiagramBaseInteractiveElementData
}> = ({element}) => {

    const {updateElement} = useUpdateElement({
        elementId: element.id,
        elementType: element.elementType,
    })

    const onChangeEventName = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateElement({
            comment: event.target.value
        })
    }


    return (
        <ElementParameter label="Comment">
            <Parameter.TextArea
                rows={6}
                value={element.comment || ''}
                onChange={onChangeEventName}
            />
        </ElementParameter>
    )
}
