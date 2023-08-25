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
                x: xPos,
                y: yPos,
            }
        }]))
    }, [xPos, yPos])
}
