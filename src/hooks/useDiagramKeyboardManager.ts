import {useUndoRedoDiagram} from "./useUndoRedoDiagram";
import {useKeyPressDetector} from "./useKeyPressDetector";
import {useEffect} from "react";
import {useCopyPaste} from "./useCopyPaste";
import {keyCombination, keys} from "../constant";
import {isKeyCombinationMatch} from "../utils";
import {useDeleteSelectedNodes} from "./useDeleteSelectedNodes";

export const useDiagramKeyboardManager = () => {
    const {pressedKeyCodes} = useKeyPressDetector(Object.values(keys))

    const {undoDiagram, redoDiagram} = useUndoRedoDiagram()

    const {copy, paste} = useCopyPaste()
    const deleteNodes = useDeleteSelectedNodes()

    useEffect(() => {
        isKeyCombinationMatch(undoDiagram, keyCombination.undo, pressedKeyCodes)
        isKeyCombinationMatch(redoDiagram, keyCombination.redo, pressedKeyCodes)
        isKeyCombinationMatch(copy, keyCombination.copy, pressedKeyCodes)
        isKeyCombinationMatch(paste, keyCombination.paste, pressedKeyCodes)
        isKeyCombinationMatch(deleteNodes, keyCombination.delete, pressedKeyCodes)
    }, [pressedKeyCodes]);
}
