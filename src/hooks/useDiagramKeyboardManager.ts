import {useKeyPress} from 'reactflow'
import {useUndoRedoDiagram} from "./useUndoRedoDiagram";
import {useEffect} from "react";
import {useCopyPaste} from "./useCopyPaste";
import {useDeleteSelectedNodes} from "./useDeleteSelectedNodes";
import {keyCombination, keys} from "../constant";
import {useKeyPressDetector} from "./useKeyPressDetector";
import {isKeyCombinationMatch} from "../utils";

export const useDiagramKeyboardManager = () => {
    const {pressedKeyCodes} = useKeyPressDetector(Object.values(keys))

    const {undoDiagram, redoDiagram} = useUndoRedoDiagram()

    const {copy, paste} = useCopyPaste()
    const deleteNodes = useDeleteSelectedNodes()

    const isNodeDeletePressed = useKeyPress('Delete')


    useEffect(() => {
        if (isNodeDeletePressed) {
            deleteNodes()
        }
    }, [isNodeDeletePressed]);

    useEffect(() => {
        isKeyCombinationMatch(undoDiagram, keyCombination.undo, pressedKeyCodes)
        isKeyCombinationMatch(redoDiagram, keyCombination.redo, pressedKeyCodes)
        isKeyCombinationMatch(copy, keyCombination.copy, pressedKeyCodes)
        isKeyCombinationMatch(paste, keyCombination.paste, pressedKeyCodes)
    }, [pressedKeyCodes]);
}
