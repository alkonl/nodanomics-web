import {useKeyPress} from 'reactflow'
import {useUndoRedoDiagram} from "./useUndoRedoDiagram";
import {useEffect} from "react";
import {useCopyPaste} from "./useCopyPaste";
import {useDeleteSelectedNodes} from "./useDeleteSelectedNodes";

export const useDiagramKeyboardManager = () => {

    const {undoDiagram, redoDiagram} = useUndoRedoDiagram()

    const {copy, paste} = useCopyPaste()
    const deleteNodes = useDeleteSelectedNodes()

    const isNodeDeletePressed = useKeyPress('Delete')
    const isUndoPressed = useKeyPress(['ctrl + z', 'command + z'])
    const isRedoPressed = useKeyPress(['ctrl + y', 'command + y', 'ctrl + c + z', 'command + c + z'])
    const isCopyPressed = useKeyPress(['ctrl + c', 'command + c'])
    const isPastePressed = useKeyPress(['ctrl + v', 'command + v'])

    useEffect(() => {
        if (isNodeDeletePressed) {
            deleteNodes()
        } else if (isUndoPressed) {
            undoDiagram()
        } else if (isRedoPressed) {
            redoDiagram()
        } else if (isCopyPressed) {
            copy()
        } else if (isPastePressed) {
            paste()
        }
    }, [isNodeDeletePressed, isUndoPressed, isRedoPressed, isCopyPressed, isPastePressed]);
}
