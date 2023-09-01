import {useEffect} from "react";
import {diagramEditorActions, useAppDispatch} from "../redux";

export const useUpdatePosAbsolute = ({yPos, xPos, nodeId}: {
    xPos: number,
    yPos: number,
    nodeId: string,
}) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(diagramEditorActions.onNodesChange([{
            id: nodeId,
            type: 'position',
            positionAbsolute: {
                x: Math.round(xPos),
                y:  Math.round(yPos),
            }
        }]))
    }, [xPos, yPos])
}
