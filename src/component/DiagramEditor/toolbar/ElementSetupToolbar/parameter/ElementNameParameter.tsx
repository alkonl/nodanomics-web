import {Parameter} from "../styledComponents";
import React from "react";
import {IDiagramConnectionData, INodeData} from "../../../../../interface";
import {useUpdateElement} from "../../../../../hooks";
import {ElementParameter} from "./ElementParameter";

export const ElementNameParameter: React.FC<{
    elementData: INodeData | IDiagramConnectionData,
}> = ({elementData}) => {
    const {updateElement} = useUpdateElement({
        elementId: elementData.id,
        elementType: elementData.elementType,
    })

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateElement({
            name: event.target.value,
        })
    }

    return (<ElementParameter label="Name">
            <Parameter.Input
                value={elementData?.name || ''}
                onChange={onNameChange}
            />
        </ElementParameter>
    )
}
