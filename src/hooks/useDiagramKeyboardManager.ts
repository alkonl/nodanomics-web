import {useUndoRedoDiagram} from "./useUndoRedoDiagram";
import {useKeyPressDetector} from "./useKeyPressDetector";
import {useEffect} from "react";
import {useCopyPaste} from "./useCopyPaste";

const key = {
    ctrl: 17,
    c: 67,
    v: 86,
    z: 90,
    y: 89,
    shift: 16,
}

export const useDiagramKeyboardManager = () => {
    const pressedKeys = useKeyPressDetector(Object.values(key))

    const {undoDiagram, redoDiagram} = useUndoRedoDiagram()

    const {copy, paste} = useCopyPaste()
    useEffect(() => {
        if (pressedKeys[key.ctrl] && pressedKeys[key.z]) {
            undoDiagram()
        }
        if (pressedKeys[key.ctrl] && pressedKeys[key.y] || pressedKeys[key.ctrl] && pressedKeys[key.shift] && pressedKeys[key.z]) {
            redoDiagram()
        }
        if (pressedKeys[key.ctrl] && pressedKeys[key.c]) {
            copy()
        }
        if (pressedKeys[key.ctrl] && pressedKeys[key.v]) {
            paste()
        }
    }, [pressedKeys]);
}
