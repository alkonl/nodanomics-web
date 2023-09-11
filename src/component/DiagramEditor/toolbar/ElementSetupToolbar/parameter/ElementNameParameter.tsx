import {Parameter} from "../../../../base";
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
        const name = event.target.value
        // Player Wallet -> playerWallet
        const formattedTag = name.toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (match, character) => character.toUpperCase());
        updateElement({
            name: name,
            tag: formattedTag,
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
