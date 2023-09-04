import {useUndoRedoDiagram} from "./useUndoRedoDiagram";
import {useKeyPressDetector} from "./useKeyPressDetector";
import {useEffect} from "react";
import {useCopyPaste} from "./useCopyPaste";
import {keys} from "../constant";

// const key = {
//     ctrl: 17,
//     c: 67,
//     v: 86,
//     z: 90,
//     y: 89,
//     shift: 16,
// }

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
