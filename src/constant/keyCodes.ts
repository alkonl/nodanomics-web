export const keys = {
    shift: 16,
    ctrl: 17,
    c: 67,
    v: 86,
    z: 90,
    y: 89,
    delete: 46,
    backspace: 8,
}

export const multiSelectKeyCodes = [keys.shift].map((key) => String(key))


export const keyCombination = {
    undo: [keys.ctrl, keys.z],
    redo: [[keys.ctrl, keys.y], [keys.ctrl, keys.c, keys.z]],
    paste: [keys.ctrl, keys.v],
    copy: [keys.ctrl, keys.c],
    delete: [[keys.delete], [keys.backspace]],
    deleteReactFlow: [keys.delete, keys.backspace].map((key) => String(key)),
}



