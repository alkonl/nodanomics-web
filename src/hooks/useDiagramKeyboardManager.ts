import {useUndoRedoDiagram} from "./useUndoRedoDiagram";
import {useKeyPressDetector} from "./useKeyPressDetector";
import {useEffect} from "react";
import {useCopyPaste} from "./useCopyPaste";
import {keyCombination, keys} from "../constant";
import {isKeyCombinationMatch} from "../utils";

export const useDiagramKeyboardManager = () => {
    const {pressedKeyCodes} = useKeyPressDetector(Object.values(keys))

    const {undoDiagram, redoDiagram} = useUndoRedoDiagram()

    const {copy, paste} = useCopyPaste()

    useEffect(() => {
        isKeyCombinationMatch(undoDiagram, keyCombination.undo, pressedKeyCodes)
        isKeyCombinationMatch(redoDiagram, keyCombination.redo, pressedKeyCodes)
        isKeyCombinationMatch(copy, keyCombination.copy, pressedKeyCodes)
        isKeyCombinationMatch(paste, keyCombination.paste, pressedKeyCodes)
    }, [pressedKeyCodes]);
}
