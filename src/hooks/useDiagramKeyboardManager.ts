import {useUndoRedoDiagram} from "./useUndoRedoDiagram";
import {useKeyPressDetector} from "./useKeyPressDetector";
import {useEffect} from "react";
import {useCopyPaste} from "./useCopyPaste";
import {keys} from "../constant";

export const useDiagramKeyboardManager = () => {
    const pressedKeys = useKeyPressDetector(Object.values(keys))

    const {undoDiagram, redoDiagram} = useUndoRedoDiagram()

    const {copy, paste} = useCopyPaste()

    useEffect(() => {
        if (pressedKeys[keys.ctrl] && pressedKeys[keys.z]) {
            undoDiagram()
        }
        if (pressedKeys[keys.ctrl] && pressedKeys[keys.y] || pressedKeys[keys.ctrl] && pressedKeys[keys.shift] && pressedKeys[keys.z]) {
            redoDiagram()
        }
        if (pressedKeys[keys.ctrl] && pressedKeys[keys.c]) {
            copy()
        }
        if (pressedKeys[keys.ctrl] && pressedKeys[keys.v]) {
            paste()
        }
    }, [pressedKeys]);
}
