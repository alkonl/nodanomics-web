import React from "react";
import {MButton} from "../../../base";
import {useDeleteNode} from "../../../../hooks";

export const NodeDeleteButton: React.FC<{
    nodeId: string
}> = ({nodeId}) => {
    const deleteNode = useDeleteNode()
    const onClick = () => {
        deleteNode([nodeId])
    }

    return (
        <MButton.Submit onClick={onClick}>
            Delete
        </MButton.Submit>
    )
}
