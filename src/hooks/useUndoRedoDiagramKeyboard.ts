import {useUndoRedoDiagram} from "./useUndoRedoDiagram";
import {useKeyPressDetector} from "./useKeyPressDetector";
import {useEffect} from "react";

const key = {
    ctrl: 17,
    z: 90,
    y: 89,
    shift: 16,
}

export const useUndoRedoDiagramKeyboard = () => {
    const {undoDiagram,redoDiagram} = useUndoRedoDiagram()
    const pressedKeys = useKeyPressDetector(Object.values(key))

    useEffect(() => {
        if (pressedKeys[key.ctrl] && pressedKeys[key.z]) {
            undoDiagram()
        }
        if (pressedKeys[key.ctrl] && pressedKeys[key.y] || pressedKeys[key.ctrl] && pressedKeys[key.shift] && pressedKeys[key.z]) {
            redoDiagram()
        }
    }, [pressedKeys]);
}
