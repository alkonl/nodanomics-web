import React from "react";
import {MButton} from "../../../base";
import {diagramEditorActions, useAppDispatch} from "../../../../redux";

export const NodeDeleteButton: React.FC<{
    nodeId: string
}> = ({nodeId}) => {
    const dispatch = useAppDispatch()
    const {deleteNode, renderState} = diagramEditorActions
    const onClick = () => {
        dispatch(deleteNode({
            nodeId,
        }))
        dispatch(renderState())
    }
    return (
        <MButton.Submit onClick={onClick}>
            Delete
        </MButton.Submit>
    )
}
